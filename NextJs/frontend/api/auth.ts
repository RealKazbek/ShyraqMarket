// src/lib/api/auth.ts
import { apiRequest, API_URL } from "./index";
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearAuthStorage,
} from "@/lib/storage";
import type { FullUser, AuthResponse, UserRoleCheck } from "@/types";

// Send verification code
export async function sendCode(phone: string) {
  return apiRequest<{ message: string }>("/auth/send-code/", {
    method: "POST",
    body: JSON.stringify({ phone }),
    enableRefresh: false,
  });
}

// Register new user
export async function register(first_name: string, phone: string, code: string) {
  const data = await apiRequest<AuthResponse>("/auth/signup/", {
    method: "POST",
    body: JSON.stringify({ first_name, phone, code }),
    enableRefresh: false,
  });

  setAccessToken(data.access);
  setRefreshToken(data.refresh);
  window.dispatchEvent(new Event("userLoggedIn"));
  return data;
}

// Login user
export async function login(phone: string, code: string) {
  const data = await apiRequest<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ phone, code }),
    enableRefresh: false,
  });

  setAccessToken(data.access);
  setRefreshToken(data.refresh);
  window.dispatchEvent(new Event("userLoggedIn"));
  return data;
}

// Get full user info
export async function getFullUser() {
  const data = await apiRequest<FullUser>("/auth/full/", {
    method: "GET",
  });

  return data;
}

// Logout user and clear storage
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
    try {
      localStorage.clear();
    } catch (err) {
      console.warn("Failed to clear localStorage:", err);
    }

    clearAuthStorage();
    window.dispatchEvent(new Event("userLoggedOut"));
    window.location.href = "/";
  }
}

// Check user role
export async function getUserRole() {
  return apiRequest<UserRoleCheck>("/auth/role-check/", { method: "GET" });
}
