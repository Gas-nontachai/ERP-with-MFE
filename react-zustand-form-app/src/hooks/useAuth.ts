import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";

export type LoginForm = {
  email: string;
  password: string;
};

export const useAuth = () => {
  return useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // ถ้ามี token หรือ header เพิ่มเติมใส่ที่นี่ เช่น
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // ถ้าต้องส่ง cookie ข้ามโดเมน
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      message.success("Login successful!");
      console.log("Logged in:", data);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Login failed.");
    },
  });
};
