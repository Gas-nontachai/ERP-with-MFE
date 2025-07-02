export type User = {
  userId: string;
  email: string;
  password?: string;
  name: string;
  roleId: string;
  role: any;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
