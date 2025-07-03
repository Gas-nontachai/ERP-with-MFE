import { Role, Menu } from "./";

export type Permission = {
  roleId: string;
  role?: Role;
  menuId: string;
  menu?: Menu;
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  addBy?: string | null;
  updateBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
};
