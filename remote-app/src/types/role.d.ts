export type RoleForm = {
  name: string;
  description: string;
};
export type RoleData = {
  id: string;
  name: string;
  description: string;
  addBy?: string;
  updateBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
