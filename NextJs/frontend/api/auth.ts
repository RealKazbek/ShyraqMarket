import { apiRequest } from "./index";

export async function login(email: string, password: string) {
  return apiRequest<{ access: string; refresh: string }>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(
  username: string,
  email: string,
  password1: string,
  password2: string
) {
  return apiRequest<{ access: string; refresh: string }>(
    "/auth/registration/",
    {
      method: "POST",
      body: JSON.stringify({ username, email, password1, password2 }),
    }
  );
}
