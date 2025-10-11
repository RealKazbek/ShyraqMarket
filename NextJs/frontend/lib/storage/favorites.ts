import { isBrowser, saveToStorage, loadFromStorage } from "./base";

export type FavoriteItem = {
  id?: number;
  title: string;
  price: number;
};

const FAVORITES_KEY = "favorites";

// ✅ Получить избранное
export function getFavorites(): FavoriteItem[] {
  return loadFromStorage<FavoriteItem[]>(FAVORITES_KEY, []);
}

// ✅ Добавить / убрать из избранного
export function toggleFavorite(item: FavoriteItem): boolean {
  if (!isBrowser()) return false;
  const favorites = getFavorites();
  const exists = favorites.find((p) => p.title === item.title);
  let updated: FavoriteItem[];

  if (exists) {
    updated = favorites.filter((p) => p.title !== item.title);
  } else {
    updated = [...favorites, item];
  }

  saveToStorage(FAVORITES_KEY, updated);
  return !exists; // возвращает новое состояние: true → добавлен, false → удалён
}

// ✅ Очистить избранное
export function clearFavorites() {
  saveToStorage(FAVORITES_KEY, []);
}
