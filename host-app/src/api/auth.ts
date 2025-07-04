import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { LoginForm } from "../types";
import Swal from "sweetalert2";

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: LoginForm) => {
      const { data: response } = await axios.post(
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
    onSuccess: (data) => {
      const { token, user, permission } = data;
      setAuth(token, user, permission);

      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        text: "กำลังนำคุณไปยังหน้าแรก",
        confirmButtonText: "ตกลง",
      }).then(() => {
        window.location.href = "/";
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error?.message ??
        error?.message ??
        "Login failed.";

      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text: message,
      });
    },
  });
};
