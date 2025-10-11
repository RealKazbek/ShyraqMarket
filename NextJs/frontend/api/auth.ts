import { apiRequest, API_URL } from "./index";
import {
  setUser,
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearAuthStorage,
} from "@/lib/storage";

export type User = {
  id: number;
  username: string | null;
  phone: string;
  address?: string | null;
  role: "ADMIN" | "USER" | "COURIER";
  avatar?: string | null;
};

export type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
};

export async function login(phone: string, code: string) {
  const data = await apiRequest<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ phone, code }),
    enableRefresh: false,
  });

  setUser(data.user);
  setAccessToken(data.access);
  setRefreshToken(data.refresh);
  window.dispatchEvent(new Event("userLoggedIn"));
  return data;
}

export async function register(username: string, phone: string, code: string) {
  const data = await apiRequest<AuthResponse>("/auth/signup/", {
    method: "POST",
    body: JSON.stringify({ username, phone, code }),
    enableRefresh: false,
  });

  setUser(data.user);
  setAccessToken(data.access);
  setRefreshToken(data.refresh);
  window.dispatchEvent(new Event("userLoggedIn"));
  return data;
}

export async function sendCode(phone: string) {
  return apiRequest<{ message: string }>("/auth/send-code/", {
    method: "POST",
    body: JSON.stringify({ phone }),
    enableRefresh: false,
  });
}

export async function getMe() {
  return apiRequest<User>("/auth/me/", { method: "GET" });
}

export async function logout() {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  try {
    await fetch(`${API_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(access ? { Authorization: `Bearer ${access}` } : {}),
      },
      body: JSON.stringify({ refresh }),
    });
  } catch (e) {
    console.warn("Logout request failed:", e);
  } finally {
    clearAuthStorage();
    window.dispatchEvent(new Event("userLoggedOut"));
  }
}
