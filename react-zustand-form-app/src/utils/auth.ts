// utils/auth.ts
export function getToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry: number = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return expiry < now;
    // oxlint-disable-next-line no-unused-vars
  } catch (error) {
    return true; // token ผิด format หรือ decode ไม่ได้
  }
}
