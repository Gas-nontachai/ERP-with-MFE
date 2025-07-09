// src/utils/permissionUtils.ts
import { useAuthStore } from "host/authStore";

type ActionType = "view" | "create" | "update" | "delete";

/**
 * ใช้ใน component ที่เป็น React Function Component ได้เลย
 */
export function useHasPermission(
  permissionName: string,
  actions: ActionType | ActionType[]
): boolean {
  const permissions = useAuthStore((state) => state.permission);
  const actionArray = Array.isArray(actions) ? actions : [actions];

  return (
    Array.isArray(permissions) &&
    permissions.some(
      (p) =>
        p.menu?.name === permissionName &&
        actionArray.some((action) => p[action] === true)
    )
  );
}
