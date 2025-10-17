import { StorageKeys } from "./keys";
import { loadFromStorage, saveToStorage, removeFromStorage } from "./base";

export type StoredUser = {
  id: number;
  username?: string | null;
  phone?: string;
  address?: string | null;
  role: "ADMIN" | "USER" | "COURIER" | "BUYER";
  avatar?: string | null;
};

export function getUser(): StoredUser | null {
  const raw = loadFromStorage<string | StoredUser | null>(
    StorageKeys.user,
    null
  );
  if (!raw) return null;

  try {
    // ✅ если уже объект — возвращаем как есть
    if (typeof raw === "object") return raw as StoredUser;

    // ✅ если строка — пробуем распарсить второй раз
    if (typeof raw === "string") {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "object" && parsed !== null) {
        // пересохраняем в нормальном формате (без двойного JSON)
        saveToStorage(StorageKeys.user, parsed);
        return parsed as StoredUser;
      }
    }
  } catch (e) {
    console.error("[Storage] Failed to parse user:", e);
  }

  return null;
}

export function setUser(user: StoredUser) {
  saveToStorage(StorageKeys.user, user);
}

export function removeUser() {
  removeFromStorage(StorageKeys.user);
}

export function clearUserData() {
  removeFromStorage(StorageKeys.user);
}
