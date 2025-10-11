import { StorageKeys } from "./keys";
import { saveToStorage, removeFromStorage } from "./base";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(StorageKeys.access);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(StorageKeys.refresh);
}

export function setAccessToken(token: string) {
  saveToStorage(StorageKeys.access, token);
}

export function setRefreshToken(token: string) {
  saveToStorage(StorageKeys.refresh, token);
}

export function clearTokens() {
  removeFromStorage(StorageKeys.access);
  removeFromStorage(StorageKeys.refresh);
}
