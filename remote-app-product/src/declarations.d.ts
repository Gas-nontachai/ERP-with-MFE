// host-app/src/stroes/languageStore
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

// host-app/src/stroes/authStore
declare module "host/authStore" {
  import { User, Permission } from "./types";

  type AuthState = {
    token: string | null;
    user: User | null;
    permission: Permission | null;
    setAuth: (token: string, user: User, permission: Permission) => void;
    clearAuth: () => void;
  };

  export const useAuthStore: import("zustand").UseBoundStore<
    import("zustand").StoreApi<AuthState>
  >;
}

// host-app/src/componants/PermissionWrapper
declare module "host/PermissionWrapper" {
  const PermissionWrapper: any;
  export default PermissionWrapper;
}
