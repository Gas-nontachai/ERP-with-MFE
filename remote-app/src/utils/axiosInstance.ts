import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // ถ้ามี response และ error format ตรงตามที่คุณกล่าวมา
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.name === "UnauthorizedError"
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.response.data.error.message || "Unauthorized",
      });
    }

    return Promise.reject(error); // ยังคงให้ catch ภายนอกทำงานได้
  }
);

export default axiosInstance;
