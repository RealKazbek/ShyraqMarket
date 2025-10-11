import { apiRequest } from "./index";

export type ProductInCart = {
  id: number;
  product_id: string;
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

export async function getCart(): Promise<Cart | null> {
  try {
    return await apiRequest<Cart>("/cart/", { method: "GET" });
  } catch (err) {
    console.error("Ошибка при загрузке корзины:", err);
    return null;
  }
}

export async function addToCart(product_id: string, quantity = 1) {
  return apiRequest<Cart>("/cart/", {
    method: "POST",
    body: JSON.stringify({ product_id, quantity }),
  });
}

export async function removeFromCart(product_id: string) {
  return apiRequest<Cart>("/cart/", {
    method: "DELETE",
    body: JSON.stringify({ product_id }),
  });
}
