import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryForm, CategoryData } from "../types";
import axios from "../utils/axiosInstance";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

const fetchCategorys = async (): Promise<CategoryData[]> => {
  const res = await axios.get("/categorys");
  return res.data;
};

export const useCategorys = () => {
  const queryClient = useQueryClient();
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );

  const { control, handleSubmit, reset, setValue } = useForm<CategoryForm>();

  const { data: categorys = [], isLoading } = useQuery({
    queryKey: ["categorys"],
    queryFn: fetchCategorys,
  });

  const createCategory = useMutation({
    mutationFn: async (data: CategoryForm) => {
      await axios.post("/categorys", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      reset();
      Toast.fire({
        icon: "success",
        title: "Category created successfully",
      });
    },
  });

  const updateCategory = useMutation({
    mutationFn: async (data: CategoryForm) => {
      if (!editingCategoryId) return;
      await axios.put(`/categorys/${editingCategoryId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      reset();
      setEditingCategoryId(null);
      Toast.fire({
        icon: "success",
        title: "Category updated successfully",
      });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`/categorys/${id}`);
      } else {
        throw new Error("Delete cancelled");
      }
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      Toast.fire({
        icon: "success",
        title: "Category deleted",
      });
    },
    onError: (error) => {
      if (error.message !== "Delete cancelled") {
        Toast.fire({
          icon: "error",
          title: "Failed to delete category",
        });
      }
    },
  });

  const onSubmit = (data: CategoryForm) => {
    if (editingCategoryId) {
      updateCategory.mutate(data);
    } else {
      createCategory.mutate(data);
    }
  };

  const startEdit = (category: CategoryData) => {
    setEditingCategoryId(category.id);
    setValue("name", category.name);
    setValue("description", category.description);
  };

  const cancelEdit = () => {
    reset();
    setEditingCategoryId(null);
  };

  return {
    categorys,
    isLoading,
    control,
    handleSubmit,
    reset,
    createCategory,
    deleteCategory,
    updateCategory,
    onSubmit,
    editingCategoryId,
    startEdit,
    cancelEdit,
  };
};
