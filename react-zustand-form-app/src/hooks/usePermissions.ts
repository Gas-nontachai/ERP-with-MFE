import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionForm, PermissionData } from "../types";
import { message } from "antd";
import axios from "../utils/axiosInstance";

const fetchPermissions = async (): Promise<PermissionData[]> => {
  const res = await axios.get("/permissions");
  return res.data;
};

export const usePermissions = () => {
  const queryClient = useQueryClient();
  const [editingPermissionId, setEditingPermissionId] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<PermissionForm>();

  const { data: permissions = [], isLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: fetchPermissions,
  });

  const createPermission = useMutation({
    mutationFn: async (data: PermissionForm) => {
      await axios.post("/permissions", {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      reset();
      message.success("Permission created successfully");
    },
  });

  const updatePermission = useMutation({
    mutationFn: async (data: PermissionForm) => {
      if (!editingPermissionId) return;
      await axios.put(`/permissions/${editingPermissionId}`, {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      reset();
      setEditingPermissionId(null);
      message.success("Permission updated successfully");
    },
  });

  const deletePermission = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/permissions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      message.success("Permission deleted");
    },
  });

  const onSubmit = (data: PermissionForm) => {
    if (editingPermissionId) {
      updatePermission.mutate(data);
    } else {
      createPermission.mutate(data);
    }
  };

  const startEdit = (permission: PermissionData) => {
    setEditingPermissionId(permission.id);
    setValue("name", permission.name);
    setValue("description", permission.description);
  };

  const cancelEdit = () => {
    reset();
    setEditingPermissionId(null);
  };

  return {
    permissions,
    isLoading,
    control,
    handleSubmit,
    reset,
    createPermission,
    deletePermission,
    updatePermission,
    onSubmit,
    editingPermissionId,
    startEdit,
    cancelEdit,
  };
};
