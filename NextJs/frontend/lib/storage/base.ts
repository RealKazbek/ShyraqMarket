export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function saveToStorage<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[Storage] Failed to save "${key}":`, e);
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.error(`[Storage] Failed to load "${key}":`, e);
    return fallback;
  }
}

export function removeFromStorage(key: string) {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`[Storage] Failed to remove "${key}":`, e);
  }
}
