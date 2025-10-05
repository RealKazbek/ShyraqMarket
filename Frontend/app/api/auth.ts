import { apiRequest } from "./index";

export async function login(email: string, password: string) {
  return apiRequest<{ token: string }>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  return apiRequest("/auth/registration/", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}
