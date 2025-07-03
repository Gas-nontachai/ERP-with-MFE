import { ReactNode } from "react";
import { useAuthStore } from "../stores/authStore";

type ActionType = "view" | "create" | "update" | "delete";

interface PermissionWrapperProps {
  permission?: string;
  action?: ActionType | ActionType[];
  children: ReactNode;
}

export default function PermissionWrapper({
  permission,
  action = "view",
  children,
}: PermissionWrapperProps) {
  const permissions = useAuthStore((state) => state.permission);

  if (!permission || permission.trim() === "") {
    return <>{children}</>;
  }

  const actions = Array.isArray(action) ? action : [action];

  const hasPermission =
    Array.isArray(permissions) &&
    permissions.some(
      (p) => p.menu?.name === permission && actions.some((a) => p[a] === true)
    );

  if (!hasPermission) return null;

  return <>{children}</>;
}
