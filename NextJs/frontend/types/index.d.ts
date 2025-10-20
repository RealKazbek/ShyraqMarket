// ---------- Users ----------
export type User = {
  first_name: string;
  last_name: string | null;
  phone: string;
  email: string | null;
  avatar: string;
  birth_date: string | null;
  gender: "male" | "female" | null;
  role: "USER" | "BUYER" | "COURIER" | "ADMIN";
  is_active: boolean;
  is_staff: boolean;
  is_banned: boolean;
  ban_reason: string | null;
  language: string;
  currency: string;
  order_count: number;
  wishlist_count: number;
  total_spent: number;
  cashback: number;
  last_ip: string | null;
  last_device: string | null;
  login_attempts: number;
  notifications_enabled: boolean;
  email_subscribed: boolean;
  whatsapp_verified: boolean;
  created_at: string;
  updated_at: string;
};

// ---------- Addresses ----------
export type Address = {
  country: string;
  city: string;
  street: string;
  house: string;
  apartment: string | null;
  postal_code: string | null;
  phone: string;
  default: boolean;
  comment: string | null;
  created_at: string;
};

// ---------- Payments ----------
export type Payment = {
  amount: string;
  currency: string;
  payment_method: "CARD" | "CASH" | "WALLET" | "KASPI" | "QIWI";
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  transaction_id: string | null;
  description: string | null;
  created_at: string;
  updated_at: string | null;
};

// ---------- Full User ----------
export type FullUser = {
  user: User;
  addresses: Address[];
  payments: Payment[];
};

// ---------- Role Check ----------
export type UserRoleCheck = {
  username: string | null;
  role: "USER" | "ADMIN" | "COURIER" | "BUYER";
  is_staff: boolean;
};

// ---------- Sign In | Sign up  ----------
export type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
};

// ---------- Account Page ----------
export type AccountHeaderForm = {
  first_name: string;
  last_name: stinrg;
  avatar: string;
  role: "USER" | "BUYER" | "COURIER" | "ADMIN";
  is_active: boolean;
};

// ---------- Account Form ----------
export type AccountFormData = {
  first_name: string;
  last_name: string | null;
  phone: string;
  email: string | null;
  birth_date: string | null;
  gender: "male" | "female" | null;
  language: string;
  currency: string;
};

// ---------- Preferences Form (True / False, swtichers) ----------
type PreferencesForm = {
  notifications_enabled: boolean;
  email_subscribed: boolean;
  whatsapp_verified: boolean;
};

// ---------- Stats ----------
type StatsForm = {
  order_count: number;
  wishlist_count: number;
  total_spent: number;
  cashback: number;
  currency: string;
};

// ---------- No name ----------
export type CreatePaymentBody = {
  amount: string;
  currency: string;
  payment_method: "CARD" | "CASH" | "KASPI";
  description?: string;
};

// ---------- API Error ----------
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

// ---------- Categories and Brands ----------
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

// ---------- Products ----------
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

// ---------- Product Query ----------
export type ProductQuery = {
  category?: number;
  brand?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  ordering?: string;
};

// ---------- Common API Types ----------
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

// ---------- Environment Variables ----------
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_NAME: string;
  }
}
