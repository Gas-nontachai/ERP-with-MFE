// components/ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getToken, isTokenExpired } from "../utils/auth";
import Swal from "sweetalert2";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getToken();

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [token]);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
