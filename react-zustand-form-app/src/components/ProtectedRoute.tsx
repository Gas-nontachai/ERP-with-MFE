// components/ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getToken, isTokenExpired } from "../utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
