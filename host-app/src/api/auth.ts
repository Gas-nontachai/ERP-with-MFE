import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/authStore";
import { LoginForm } from "../types";

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data: { token: any; user: any; permission: any }) => {
      const { token, user, permission } = data;
      setAuth(token, user, permission);

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!"); // <-- ใช้ toast แทน message.success
      window.location.href = "/";
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed."); // <-- ใช้ toast.error แทน message.error
    },
  });
};
