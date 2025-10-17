// src/lib/api/auth.ts

import { apiRequest, API_URL } from "./index";
import {
  setUser,
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearAuthStorage,
} from "@/lib/storage";
import type { FullUserResponse, AuthResponse, UserRoleCheck } from "@/types";

// ------------------------------------------------------
// 📞 Отправка кода
// ------------------------------------------------------
export async function sendCode(phone: string) {
  return apiRequest<{ message: string }>("/auth/send-code/", {
    method: "POST",
    body: JSON.stringify({ phone }),
    enableRefresh: false,
  });
}

// ------------------------------------------------------
// 🧾 Регистрация
// ------------------------------------------------------
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

// ------------------------------------------------------
// 🔐 Вход
// ------------------------------------------------------
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

// ------------------------------------------------------
// 👤 Получить полную информацию о пользователе
// ------------------------------------------------------
export async function getFullUser() {
  const data = await apiRequest<FullUserResponse>("/auth/full/", {
    method: "GET",
  });
  setUser(data.user);
  return data;
}

// ------------------------------------------------------
// 🚪 Выход из системы (полная очистка и редирект)
// ------------------------------------------------------
export async function logout() {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  try {
    // отправляем logout-запрос на backend
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
    // полная очистка localStorage
    try {
      localStorage.clear();
    } catch (err) {
      console.warn("Failed to clear localStorage:", err);
    }

    // очистка авторизационных данных
    clearAuthStorage();

    // уведомление других вкладок/компонентов
    window.dispatchEvent(new Event("userLoggedOut"));

    // перенаправление на главный экран
    window.location.href = "/";
  }
}

// ------------------------------------------------------
// 🧩 Проверка роли
// ------------------------------------------------------
export async function getUserRole() {
  return apiRequest<UserRoleCheck>("/auth/role-check/", { method: "GET" });
}
