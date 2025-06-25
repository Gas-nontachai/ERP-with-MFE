import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuForm, MenuData } from "../types";
import { message } from "antd";
import axios from "../utils/axiosInstance";

const fetchMenus = async (): Promise<MenuData[]> => {
  const res = await axios.get("/menus");
  return res.data;
};

export const useMenus = () => {
  const queryClient = useQueryClient();
  const [editingMenuId, setEditingMenuId] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<MenuForm>();

  const { data: menus = [], isLoading } = useQuery({
    queryKey: ["menus"],
    queryFn: fetchMenus,
  });

  const createMenu = useMutation({
    mutationFn: async (data: MenuForm) => {
      await axios.post("/menus", {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      reset();
      message.success("Menu created successfully");
    },
  });

  const updateMenu = useMutation({
    mutationFn: async (data: MenuForm) => {
      if (!editingMenuId) return;
      await axios.put(`/menus/${editingMenuId}`, {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      reset();
      setEditingMenuId(null);
      message.success("Menu updated successfully");
    },
  });

  const deleteMenu = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/menus/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      message.success("Menu deleted");
    },
  });

  const onSubmit = (data: MenuForm) => {
    if (editingMenuId) {
      updateMenu.mutate(data);
    } else {
      createMenu.mutate(data);
    }
  };

  const startEdit = (menu: MenuData) => {
    setEditingMenuId(menu.id);
    setValue("name", menu.name);
    setValue("description", menu.description);
  };

  const cancelEdit = () => {
    reset();
    setEditingMenuId(null);
  };

  return {
    menus,
    isLoading,
    control,
    handleSubmit,
    reset,
    createMenu,
    deleteMenu,
    updateMenu,
    onSubmit,
    editingMenuId,
    startEdit,
    cancelEdit,
  };
};
