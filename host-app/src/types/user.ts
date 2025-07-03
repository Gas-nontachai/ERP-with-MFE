import { Role } from "./";

export type User = {
  userId: string;
  email: string;
  password?: string;
  name: string;
  roleId: string;
  role?: Role;
  createdAt: Date | string;
  updatedAt: Date | string;
};
