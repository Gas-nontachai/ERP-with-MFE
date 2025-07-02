import { ReactNode } from "react";
import AuthLayout from "../layouts/AuthLayout";

type RouteWrapperProps = {
  children: ReactNode;
  layout?: "main" | "auth";
};

// SPA section: ไม่ต้อง wrap MainLayout ซ้ำ
const RouteWrapper = ({ children, layout = "main" }: RouteWrapperProps) => {
  if (layout === "auth") return <AuthLayout>{children}</AuthLayout>;
  return <>{children}</>;
};

export default RouteWrapper;
