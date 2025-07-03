// utils/auth.ts
import { useAuthStore } from "host/authStore";

/**
 * ดึง access token จาก Zustand (ถ้าไม่มีใน Zustand fallback ไป localStorage)
 */
export function getToken(): string | null {
  const tokenFromStore = useAuthStore.getState().token;
  if (tokenFromStore) return tokenFromStore;

  // fallback เผื่อ Zustand ยังไม่ได้ restore
  return localStorage.getItem("accessToken");
}

/**
 * เช็คว่า token หมดอายุหรือยัง
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry: number = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return expiry < now;
    // oxlint-disable-next-line no-unused-vars
  } catch (error) {
    return true;
  }
}

/**
 * ดึง user จาก Zustand (หรือ localStorage ถ้ามี)
 */
export function getUser() {
  const userFromStore = useAuthStore.getState().user;
  if (userFromStore) return userFromStore;

  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}
