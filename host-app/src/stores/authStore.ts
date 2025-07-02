import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Permission } from "../types";

type AuthState = {
  token: string | null;
  user: User | null;
  permission: Permission | null;
  setAuth: (token: string, user: User, permission: Permission) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      permission: null,
      setAuth: (token, user, permission) => set({ token, user, permission }),
      clearAuth: () => set({ token: null, user: null, permission: null }),
    }),
    {
      name: "auth-storage", // ชื่อ key ใน localStorage
      // ตัวเลือกเพิ่มเติม เช่น serialize, deserialize, storage, whitelist, blacklist
    }
  )
);
