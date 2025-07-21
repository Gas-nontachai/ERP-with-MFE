export type CategoryForm = {
  name: string;
  description: string;
};
export type CategoryData = {
  id: string;
  name: string;
  description: string;
  addBy?: string;
  updateBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
