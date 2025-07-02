import { create } from "zustand";
import { persist } from "zustand/middleware";

type LanguageKey = "en" | "th";

interface LanguageState {
  lang: LanguageKey;
  setLang: (lang: LanguageKey) => void;
}

export const UseLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "lang-storage", // ชื่อ key ใน localStorage
    }
  )
);
