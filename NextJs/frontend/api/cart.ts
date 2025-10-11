// src/api/cart.ts
import { apiRequest } from "./index";

export type ProductInCart = {
  id: number;
  product_id: string; // UUID
  title: string;
  price: string;
  image: string;
  description?: string;
};

export type CartItem = {
  id: number;
  product: ProductInCart;
  quantity: number;
};

export type Cart = {
  id: number;
  user: number;
  items: CartItem[];
  total_price: string;
};

// ----------------------------------------------------
// Получить корзину
// ----------------------------------------------------
export async function getCart(): Promise<Cart | null> {
  try {
    const res = await apiRequest<Cart>("/cart/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
      },
    });
    return res;
  } catch (err) {
    console.error("Ошибка при загрузке корзины:", err);
    return null;
  }
}

// ----------------------------------------------------
// Добавить товар
// ----------------------------------------------------
export async function addToCart(product_id: string, quantity: number = 1) {
  try {
    return await apiRequest<Cart>("/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
      },
      body: JSON.stringify({ product_id, quantity }),
    });
  } catch (err) {
    console.error("Ошибка при добавлении товара в корзину:", err);
    throw err;
  }
}

// ----------------------------------------------------
// Удалить товар
// ----------------------------------------------------
export async function removeFromCart(product_id: string) {
  try {
    return await apiRequest<Cart>("/cart/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
      },
      body: JSON.stringify({ product_id }),
    });
  } catch (err) {
    console.error("Ошибка при удалении товара из корзины:", err);
    throw err;
  }
}