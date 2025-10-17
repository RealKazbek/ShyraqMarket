// ==========================================
// 🌍 ГЛОБАЛЬНЫЕ ТИПЫ ДЛЯ SHYRAQ MARKET
// ==========================================

// ---------- Пользователи ----------
export type User = {
  id: number;
  username: string | null;
  phone: string;
  role: "USER" | "ADMIN" | "COURIER" | "BUYER";
  avatar?: string | null;
};

export type UserRoleCheck = {
  username: string | null;
  role: "USER" | "ADMIN" | "COURIER" | "BUYER";
  is_staff: boolean;
};

export type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
};

// ---------- Полная информация о пользователе ----------
export type FullUser = User & {
  first_name: string;
  last_name: string;
  email: string;
  gender: "male" | "female";
  language: "ru" | "kk" | "en";
  currency: "KZT" | "USD";
  country: string;
  city: string;
  street: string;
  house: string;
  postal_code: string;
  order_count: number;
  wishlist_count: number;
  total_spent: number;
  cashback: number;
  notifications_enabled: boolean;
  email_subscribed: boolean;
  whatsapp_verified: boolean;
  addresses?: Address[];
  payments?: Payment[];
};

export type FullUserResponse = {
  user: FullUser;
  addresses: Address[];
  payments: Payment[];
};

// ---------- Адреса ----------
export type Address = {
  id: number;
  country: string;
  city: string;
  street: string;
  house: string;
  phone: string;
  default: boolean;
};

// ---------- Платежи ----------
export type Payment = {
  id: number;
  amount: string;
  currency: string;
  payment_method: "CARD" | "CASH" | "KASPI";
  status: "PENDING" | "PAID" | "FAILED";
  description?: string;
  created_at: string;
  updated_at?: string;
};

// ---------- Ошибки API ----------
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

export type CreatePaymentBody = {
  amount: string;
  currency: string;
  payment_method: "CARD" | "CASH" | "KASPI";
  description?: string;
};

// ---------- Категории и бренды ----------
export type Brand = {
  id: number;
  name: string;
  description?: string;
  logo?: string | null;
};

export type Category = {
  id: number;
  name: string;
  parent?: number | null;
  image?: string | null;
};

// ---------- Продукты ----------
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  sku?: string;
  barcode?: string;
  is_featured: boolean;
  is_discounted: boolean;
  created_at: string;
  updated_at?: string;
  category: Category;
  brand: Brand;
  views_count?: number;
  images?: string[];
  videos?: string[];
};

// ---------- Запросы для продуктов ----------
export type ProductQuery = {
  category?: number;
  brand?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  ordering?: string;
};

// ---------- Общие типы ----------
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type PaginatedResponse<T> = {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
};

// ---------- Переменные окружения ----------
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_NAME: string;
  }
}
