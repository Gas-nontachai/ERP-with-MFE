import { ReactNode } from "react";
import { useAuthStore } from "../stores/authStore";

interface PermissionWrapperProps {
  permission?: string; // สามารถเป็น "" หรือ undefined ได้
  action?: "view" | "create" | "update" | "delete"; // default = "view"
  children: ReactNode;
}

export default function PermissionWrapper({
  permission,
  action = "view",
  children,
}: PermissionWrapperProps) {
  const permissions = useAuthStore((state) => state.permission);

  // ถ้าไม่ได้ระบุ permission หรือเป็น "", แสดงได้เลย
  if (!permission || permission.trim() === "") {
    return <>{children}</>;
  }

  const hasPermission =
    Array.isArray(permissions) &&
    permissions.some((p) => p.menu?.name === permission && p[action] === true);

  if (!hasPermission) return null;

  return <>{children}</>;
}
