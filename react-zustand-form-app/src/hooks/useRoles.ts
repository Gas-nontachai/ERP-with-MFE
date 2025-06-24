import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleForm, RoleData } from "../types";
import { message } from "antd";
import axios from "../utils/axiosInstance";

const fetchRoles = async (): Promise<RoleData[]> => {
  const res = await axios.get("/roles");
  return res.data;
};

export const useRoles = () => {
  const queryClient = useQueryClient();
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<RoleForm>();

  const { data: roles = [], isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  const createRole = useMutation({
    mutationFn: async (data: RoleForm) => {
      await axios.post("/roles", {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      reset();
      message.success("Role created successfully");
    },
  });

  const updateRole = useMutation({
    mutationFn: async (data: RoleForm) => {
      if (!editingRoleId) return;
      await axios.put(`/roles/${editingRoleId}`, {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      reset();
      setEditingRoleId(null);
      message.success("Role updated successfully");
    },
  });

  const deleteRole = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/roles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      message.success("Role deleted");
    },
  });

  const onSubmit = (data: RoleForm) => {
    if (editingRoleId) {
      updateRole.mutate(data);
    } else {
      createRole.mutate(data);
    }
  };

  const startEdit = (role: RoleData) => {
    setEditingRoleId(role.id);
    setValue("name", role.name);
    setValue("description", role.description);
  };

  const cancelEdit = () => {
    reset();
    setEditingRoleId(null);
  };

  return {
    roles,
    isLoading,
    control,
    handleSubmit,
    reset,
    createRole,
    deleteRole,
    updateRole,
    onSubmit,
    editingRoleId,
    startEdit,
    cancelEdit,
  };
};
