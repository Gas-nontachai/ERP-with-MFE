export type Permission = {
  roleId: string;
  role?: any;
  menuId: string;
  menu?: any;
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  addBy?: string | null;
  updateBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
};
