import { create } from "zustand";
import { User } from "../types";

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
