export function saveToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage save error:", e);
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (e) {
    console.error("Storage load error:", e);
    return fallback;
  }
}

export function removeFromStorage(key: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Storage remove error:", e);
  }
}

export function appendToList<T>(key: string, item: T) {
  const current = loadFromStorage<T[]>(key, []);
  current.push(item);
  saveToStorage(key, current);
}

export function removeFromList<T>(
  key: string,
  predicate: (item: T) => boolean
) {
  const current = loadFromStorage<T[]>(key, []);
  const updated = current.filter((i) => !predicate(i));
  saveToStorage(key, updated);
}
