import { apiRequest } from "./index";

type ProductInCart = {
  id: number; // pk (int)
  product_id: string; // uuid
  title: string;
  price: string;
  image: string; // ✅ теперь есть
  description?: string; // если в сериалайзере есть
};

type CartItem = {
  id: number;
  product: ProductInCart; // теперь TS знает структуру
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
export async function getCart(): Promise<Cart> {
  return apiRequest<Cart>("/cart/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // ✅ добавил
      Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
    },
  });
}

// ----------------------------------------------------
// Добавить товар
// ----------------------------------------------------
export async function addToCart(
  product_id: string, // лучше string, если у тебя UUID
  quantity: number = 1
): Promise<Cart> {
  return apiRequest<Cart>("/cart/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ✅ добавил
      Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
    },
    body: JSON.stringify({ product_id, quantity }),
  });
}

// ----------------------------------------------------
// Удалить товар
// ----------------------------------------------------
export async function removeFromCart(product_id: string): Promise<Cart> {
  return apiRequest<Cart>("/cart/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // ✅ добавил
      Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
    },
    body: JSON.stringify({ product_id }),
  });
}
