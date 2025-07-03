import axios from "axios";
import { getToken } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  withCredentials: true,
});

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

export default axiosInstance;
