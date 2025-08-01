import { create } from "zustand";
import { persist } from "zustand/middleware";

type LanguageKey = "en" | "th";

interface LanguageState {
  lang: LanguageKey;
  setLang: (lang: LanguageKey) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "lang-storage",
    }
  )
);
