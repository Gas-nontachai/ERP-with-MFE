// utils/logout.ts
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  return useCallback(() => {
    clearAuth();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/login");
  }, [clearAuth, navigate]);
};
