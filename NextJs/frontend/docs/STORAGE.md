# 🧱 STORAGE MODULE — Documentation

## 📁 Overview

`/lib/storage/` — модуль для безопасного и типизированного доступа к **LocalStorage**  
в Next.js приложении (**SSR-safe**, **универсальный**, **оптимизированный под продакшн**).

Используется для хранения:

- 🔐 токенов авторизации (`access`, `refresh`)
- 👤 данных пользователя (`user`)
- 🧹 быстрого удаления всех auth-данных при logout

---

## 📂 Directory Structure

```
/lib/storage/
 ├─ base.ts       → базовые функции работы с LocalStorage (save/load/remove)
 ├─ keys.ts       → все ключи хранения (user, access, refresh)
 ├─ tokens.ts     → работа с access / refresh токенами
 ├─ user.ts       → функции для данных пользователя
 └─ index.ts      → единая точка импорта и утилита clearAuthStorage()
```

---

## ⚙️ 1. Base Functions — `base.ts`

### Functions

| Function                            | Description                                         |
| ----------------------------------- | --------------------------------------------------- |
| `isBrowser()`                       | Проверяет, выполняется ли код в браузере (SSR-safe) |
| `saveToStorage<T>(key, value)`      | Сохраняет объект или значение в LocalStorage        |
| `loadFromStorage<T>(key, fallback)` | Загружает значение из LocalStorage с fallback       |
| `removeFromStorage(key)`            | Удаляет значение по ключу                           |

### Example

```ts
saveToStorage("theme", "dark");
const theme = loadFromStorage("theme", "light");
removeFromStorage("theme");
```

---

## 🔑 2. Keys — `keys.ts`

Все ключи централизованы в одном месте:

```ts
export const StorageKeys = {
  user: "user",
  access: "access",
  refresh: "refresh",
} as const;
```

> 💡 Это позволяет избежать ошибок вроде `"acces"` вместо `"access"`  
> и делает возможной автоподстановку при импортах.

---

## 🔐 3. Tokens — `tokens.ts`

Функции для управления токенами авторизации.

| Function                 | Description                             |
| ------------------------ | --------------------------------------- |
| `getAccessToken()`       | Возвращает access-токен из LocalStorage |
| `getRefreshToken()`      | Возвращает refresh-токен                |
| `setAccessToken(token)`  | Сохраняет access-токен                  |
| `setRefreshToken(token)` | Сохраняет refresh-токен                 |
| `clearTokens()`          | Удаляет оба токена из LocalStorage      |

### Example

```ts
setAccessToken(response.access);
setRefreshToken(response.refresh);

const token = getAccessToken();
if (token) console.log("Access token loaded:", token);
```

---

## 👤 4. User — `user.ts`

Типизированные функции для данных пользователя.

### Type

```ts
export type StoredUser = {
  id: number;
  username?: string;
  phone?: string;
  address?: string | null;
  role: "ADMIN" | "USER" | "COURIER";
  avatar?: string | null;
};
```

### Features

- ✅ Автоматически определяет **старый формат** (`"user": "{\"id\":1,...}"`)  
  и **новый формат** (`"user": { id: 1, ... }`)
- ✅ После чтения автоматически **перезаписывает в нормальный JSON**
- ✅ Безопасен при SSR

### Functions

| Function          | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `getUser()`       | Возвращает объект пользователя (распознаёт оба формата) |
| `setUser(user)`   | Сохраняет пользователя в правильном формате             |
| `removeUser()`    | Удаляет пользователя                                    |
| `clearUserData()` | Синоним удаления данных пользователя                    |

### Example

```ts
import { getUser, setUser } from "@/lib/storage";

const user = getUser(); // { id: 1, username: "Admin", role: "ADMIN" }
if (user?.role === "ADMIN") console.log("Welcome, admin!");

// сохранить обновлённого пользователя
setUser({ ...user, phone: "+77061112233" });
```

---

## 🧩 5. Index — `index.ts`

Главная точка импорта.  
Собирает все модули и добавляет универсальную функцию для logout.

### Exports

```ts
export * from "./keys";
export * from "./base";
export * from "./tokens";
export * from "./user";
```

### Utility

```ts
import { clearTokens } from "./tokens";
import { removeUser } from "./user";

export function clearAuthStorage() {
  clearTokens();
  removeUser();
}
```

### Example

```ts
import { clearAuthStorage, getUser } from "@/lib/storage";

function handleLogout() {
  clearAuthStorage();
  console.log("Logged out:", getUser()); // null
}
```

---

## 🚀 Usage Examples

### In `Login.tsx`

```ts
import { setUser, setAccessToken, setRefreshToken } from "@/lib/storage";

setUser(response.user);
setAccessToken(response.access);
setRefreshToken(response.refresh);
```

### In `Header.tsx`

```ts
import { getUser, clearAuthStorage } from "@/lib/storage";

const [user, setUser] = useState(getUser());

function handleLogout() {
  clearAuthStorage();
  setUser(null);
}
```

---

## 🧠 Notes

- Все функции **SSR-safe** — не ломаются при рендере на сервере.
- `getUser()` автоматически исправит старые данные, если они были  
  сохранены как `"{"id":1,...}"` внутри строки.
- Данные токенов (`access`, `refresh`) сохраняются как обычные строки.
- Можно расширять модуль: добавить `theme.ts`, `cart.ts`, `favorites.ts` и т.п.  
  — просто следуй той же архитектуре.

---

## 🏁 Example Import Summary

```ts
import {
  getUser,
  setUser,
  removeUser,
  getAccessToken,
  setAccessToken,
  clearAuthStorage,
} from "@/lib/storage";
```

---

**Author:** `Kazbek Assanbek`  
**Last Updated:** `2025-10-11`