export type MenuForm = {
  name: string;
  description: string;
};
export type MenuData = {
  id: string;
  name: string;
  description: string;
  addBy?: string;
  updateBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
