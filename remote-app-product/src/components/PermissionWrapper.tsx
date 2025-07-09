// remote/src/components/PermissionWrapper.ts
import { lazy } from "react";
import { ComponentType } from "react";

type ActionType = "view" | "create" | "update" | "delete";

interface PermissionWrapperProps {
  permission?: string;
  action?: ActionType | ActionType[];
  children: React.ReactNode;
}

const PermissionWrapper = lazy(
  () => import("host/PermissionWrapper")
) as ComponentType<PermissionWrapperProps>;

export default PermissionWrapper;
