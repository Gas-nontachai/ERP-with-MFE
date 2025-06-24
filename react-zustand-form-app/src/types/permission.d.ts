export type PermissionForm = {
  name: string;
  description: string;
};
export type PermissionData = {
  id: string;
  name: string;
  description: string;
  addBy?: string;
  updateBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
