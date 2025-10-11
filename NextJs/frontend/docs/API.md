# ⚙️ API MODULE — Documentation

## 📁 Overview

`/lib/api/` — это **универсальный, безопасный и production-ready слой** для работы с REST API  
в Next.js приложении **Shyraq Market**.

Он:
- 🔐 Автоматически добавляет токены из LocalStorage
- 🔄 Выполняет **рефреш access-токена** при 401
- 🚦 Имеет **таймауты**, **ретраи** и централизованную обработку ошибок
- 🧠 Типизирован (TypeScript, без `any`)
- 🧹 Полностью совместим с `/lib/storage/`

---

## 📂 Directory Structure

```
/lib/api/
 ├─ index.ts      → универсальная функция apiRequest + авто-рефреш токенов
 ├─ auth.ts       → логин, регистрация, logout, getMe
 ├─ cart.ts       → операции с корзиной
 ├─ product.ts    → получение списка товаров
 ├─ errors.ts     → класс ApiError (единый тип ошибок)
 └─ types.ts      → общие типы (User, Product, Cart, т.д.)
```

---

## 🧱 1. Base Client — `index.ts`

Главная функция `apiRequest<T>()` — единая точка для всех запросов к API.

### ✨ Features

| Возможность | Описание |
|--------------|-----------|
| **Auto Token** | Автоматически добавляет `Authorization: Bearer ...` |
| **401 Refresh** | Автоматически обновляет access-токен через refresh |
| **Timeout** | По умолчанию 15 секунд (`NEXT_PUBLIC_API_TIMEOUT_MS`) |
| **Retries** | Один мягкий retry при 429 или 5xx |
| **Queue** | Если несколько запросов упали с 401 — ждет общий refresh |
| **Events** | При logout → `window.dispatchEvent("userLoggedOut")` |
| **Env-config** | URL и таймауты настраиваются через `.env` |

---

### ⚙️ Environment Variables

| Переменная | Назначение | Пример |
|-------------|-------------|--------|
| `NEXT_PUBLIC_API_URL` | Базовый URL API | `https://api.shyraq.kz` |
| `NEXT_PUBLIC_REFRESH_PATH` | Путь для refresh запроса | `/auth/refresh/` |
| `NEXT_PUBLIC_API_TIMEOUT_MS` | Таймаут (в мс) | `15000` |

---

### 🧩 Example

```ts
import { apiRequest } from "@/lib/api";

const products = await apiRequest("/api/products/", { method: "GET" });
```

### 📦 Error Handling

Все ошибки выбрасываются как экземпляры `ApiError`:

```ts
try {
  await apiRequest("/cart/", { method: "GET" });
} catch (err) {
  if (err instanceof ApiError) {
    console.error(`Ошибка API ${err.status}: ${err.message}`);
  }
}
```

---

## 🧠 2. Error Class — `errors.ts`

```ts
export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}
```

---

## 🔐 3. Auth — `auth.ts`

### Основные методы

| Метод | Описание |
|--------|-----------|
| `login(phone, code)` | Вход, сохраняет user + токены |
| `register(username, phone, code)` | Регистрация и вход |
| `sendCode(phone)` | Отправка SMS кода |
| `getMe()` | Получение профиля пользователя |
| `logout()` | Выход, очистка токенов и user |

### Example

```ts
import { login, logout, getMe } from "@/lib/api/auth";

await login("+77061112233", "1234");
const me = await getMe();
await logout();
```

---

## 🛒 4. Cart — `cart.ts`

| Метод | Описание |
|--------|-----------|
| `getCart()` | Получить корзину пользователя |
| `addToCart(product_id, quantity)` | Добавить товар |
| `removeFromCart(product_id)` | Удалить товар |

### Example

```ts
import { getCart, addToCart } from "@/lib/api/cart";

const cart = await getCart();
await addToCart("uuid-12345", 2);
```

---

## 🛍 5. Product — `product.ts`

| Метод | Описание |
|--------|-----------|
| `getProducts()` | Получить список товаров |

### Example

```ts
import { getProducts } from "@/lib/api/product";

const products = await getProducts();
console.log(products);
```

---

## 🚀 Production Features Summary

| Возможность | Описание |
|--------------|-----------|
| ✅ Авто токены | Добавляются автоматически в каждый запрос |
| ✅ Auto Refresh | При 401 выполняется обновление access токена |
| ✅ Queue-safe | Один общий refresh на все запросы |
| ✅ Таймауты | Прерывание зависших fetch-запросов |
| ✅ Ретраи | При 429 / 5xx повтор запроса 1 раз |
| ✅ Без `any` | Только `unknown`, `Error`, `ApiError` |
| ✅ Env Ready | Поддержка `.env` переменных |
| ✅ SSR-safe | Не ломается при SSR |
| ✅ Typed | Все методы строго типизированы |
| ✅ Clean | Полностью проходит ESLint и TypeScript checks |

---

**Author:** `Kazbek Assanbek`  
**Last Updated:** `2025-10-11`