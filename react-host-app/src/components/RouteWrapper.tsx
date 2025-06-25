// src/components/RouteWrapper.tsx
import { ReactNode } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

type RouteWrapperProps = {
  children: ReactNode;
  layout?: "main" | "auth";
};

const RouteWrapper = ({ children, layout = "main" }: RouteWrapperProps) => {
  if (layout === "auth") return <AuthLayout>{children}</AuthLayout>;
  return <MainLayout>{children}</MainLayout>;
};

export default RouteWrapper;
