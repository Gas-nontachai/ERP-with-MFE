export type Role = {
  id: string;
  name: string;
  description: string;
  addBy?: string;
  updateBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
