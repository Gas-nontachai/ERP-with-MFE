import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // ชื่อ key ใน localStorage
      // ตัวเลือกเพิ่มเติม เช่น serialize, deserialize, storage, whitelist, blacklist
    }
  )
);
