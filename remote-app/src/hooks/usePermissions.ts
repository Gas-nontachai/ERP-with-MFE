import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axiosInstance";
import { MenuData, Permission } from "../types";

type PermissionsMap = Record<
  string, // menuId
  {
    roleId: string;
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }
>;

interface UseRolePermissionsReturn {
  menus: MenuData[];
  permissionsMap: PermissionsMap;
  isLoading: boolean;
  updatePermissions: (data: PermissionsMap) => void;
}

export const useRolePermissions = (
  roleId: string
): UseRolePermissionsReturn => {
  const queryClient = useQueryClient();

  // ดึงเมนูทั้งหมด
  const { data: menus = [], isLoading: loadingMenus } = useQuery<MenuData[]>({
    queryKey: ["menus"],
    queryFn: async () => {
      const res = await axios.get("/menus");
      return res.data;
    },
  });

  // ดึง Permission ของ Role
  const { data: permissions = [], isLoading: loadingPermissions } = useQuery<
    Permission[]
  >({
    queryKey: ["permissions", roleId],
    queryFn: async () => {
      const res = await axios.get(`/permissions?roleId=${roleId}`);
      return res.data;
    },
  });

  // แปลง permissions list เป็น map (menuId -> permission object)
  const permissionsMap: PermissionsMap = {};
  permissions?.forEach((p) => {
    permissionsMap[p.menuId] = {
      roleId,
      view: p.view,
      create: p.create,
      update: p.update,
      delete: p.delete,
    };
  });

  // helper แปลง PermissionsMap -> array สำหรับส่งไป backend
  const mapToArray = (data: PermissionsMap): Permission[] => {
    return Object.entries(data).map(([menuId, perms]) => ({
      roleId: perms.roleId,
      menuId,
      view: perms.view,
      create: perms.create,
      update: perms.update,
      delete: perms.delete,
    }));
  };

  // mutation สำหรับอัพเดต permission ทั้งหมด
  const mutation = useMutation({
    mutationFn: async (data: PermissionsMap) => {
      const payload = mapToArray(data);
      await axios.put(`/permissions`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions", roleId] });
    },
  });

  return {
    menus,
    permissionsMap,
    isLoading: loadingMenus || loadingPermissions,
    updatePermissions: (data) => mutation.mutate(data),
  };
};
