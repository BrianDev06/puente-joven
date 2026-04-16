/**
 * Authentication and User Persistence Utilities
 */

const TOKEN_KEY = "pj_auth_token";
const USER_KEY = "pj_auth_user";

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
}

function saveToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function saveUser(user: any): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser(): any | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
}

function clearToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function authHeaders(): HeadersInit {
  const token = getToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

export {
  getApiBaseUrl,
  saveToken,
  getToken,
  saveUser,
  getUser,
  clearToken,
  authHeaders
};
