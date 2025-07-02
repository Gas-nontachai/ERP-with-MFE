// store/authStore.ts
import { create } from "zustand";

type User = {
  userId: string;
  email: string;
  name: string;
  roleId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null }),
}));
