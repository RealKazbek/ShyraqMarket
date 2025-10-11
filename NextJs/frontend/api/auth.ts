import { apiRequest } from "./index";

export type User = {
  id: number;
  username: string | null;
  phone: string;
  address?: string | null;
  role: string;
  avatar?: string | null;
};

export type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
};

export async function login(phone: string, code: string) {
  return apiRequest<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ phone, code }),
  });
}

export async function register(username: string, phone: string, code: string) {
  return apiRequest<AuthResponse>("/auth/signup/", {
    method: "POST",
    body: JSON.stringify({ username, phone, code }),
  });
}

export async function sendCode(phone: string) {
  return apiRequest<{ message: string }>("/auth/send-code/", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

export async function getMe(token: string) {
  return apiRequest<User>("/auth/me/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function logout() {
  const refresh = localStorage.getItem("refresh");
  const access = localStorage.getItem("access");

  if (!refresh) return;

  try {
    const res = await fetch("http://127.0.0.1:8000/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      console.warn("Ошибка при logout:", await res.text());
    }

    // Очистка хранилища
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLoggedOut"));
  } catch (error) {
    console.error("Ошибка при logout:", error);
  }
}
