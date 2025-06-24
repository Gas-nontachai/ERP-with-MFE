import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export type LoginForm = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

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
    onSuccess: (data) => {
      const { token, user } = data;
      setAuth(token, user);

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      message.success("Login successful!");
      navigate("/");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Login failed.");
    },
  });
};
