// src/store/userStore.ts
import { create } from "zustand";

type User = {
  user_id: string;
  name: string;
  email: string;
  tel: string;
  add_date: string;
};

type UserStore = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
