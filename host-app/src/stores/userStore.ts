import { create } from "zustand";

type User = {
  id: string;
  username: string;
  token: string;
  // เพิ่มเติมข้อมูล user ตามต้องการ
};

type StoreState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
