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
