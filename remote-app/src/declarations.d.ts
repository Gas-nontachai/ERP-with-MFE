// remote/src/declarations.d.ts
declare module "host/languageStore" {
  type LanguageKey = "en" | "th";

  interface LanguageState {
    lang: LanguageKey;
    setLang: (lang: LanguageKey) => void;
  }

  export const useLanguageStore: import("zustand").UseBoundStore<
    import("zustand").StoreApi<LanguageState>
  >;
}
