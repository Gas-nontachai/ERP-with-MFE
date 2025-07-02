import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types";
import { message } from "antd";
import axios from "../utils/axiosInstance";

const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get("/users");
  return res.data;
};

export const useUsers = () => {
  const queryClient = useQueryClient();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<User>();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUser = useMutation({
    mutationFn: async (data: User) => {
      await axios.post("/users", {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      message.success("User created successfully");
    },
  });

  const updateUser = useMutation({
    mutationFn: async (data: User) => {
      if (!editingUserId) return;
      await axios.put(`/users/${editingUserId}`, {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      setEditingUserId(null);
      message.success("User updated successfully");
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("User deleted");
    },
  });

  const onSubmit = (data: User) => {
    if (editingUserId) {
      delete data.password;
      updateUser.mutate({ ...data, userId: editingUserId });
    } else {
      createUser.mutate(data);
    }
  };

  const startEdit = (user: User) => {
    setEditingUserId(user.userId);
    setValue("email", user.email);
    setValue("name", user.name);
    setValue("password", user.password);
    setValue("roleId", user.roleId);
  };

  const cancelEdit = () => {
    reset();
    setEditingUserId(null);
  };

  return {
    users,
    isLoading,
    control,
    handleSubmit,
    reset,
    createUser,
    deleteUser,
    updateUser,
    onSubmit,
    editingUserId,
    startEdit,
    cancelEdit,
  };
};
