import { isBrowser, saveToStorage, loadFromStorage } from "./base";

export type CartItem = {
  id?: number;
  title: string;
  price: number;
  quantity: number;
};

const CART_KEY = "cart";

// ✅ Получить корзину
export function getCart(): CartItem[] {
  return loadFromStorage<CartItem[]>(CART_KEY, []);
}

// ✅ Добавить товар
export function addToCart(item: CartItem) {
  if (!isBrowser()) return;
  const cart = getCart();
  const existing = cart.find((p) => p.title === item.title);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveToStorage(CART_KEY, cart);
}

// ✅ Изменить количество товара
export function updateQuantity(title: string, delta: number) {
  if (!isBrowser()) return;
  const cart = getCart();

  const updated = cart
    .map((p) =>
      p.title === title
        ? { ...p, quantity: Math.max(1, p.quantity + delta) }
        : p
    )
    .filter((p) => p.quantity > 0);

  saveToStorage(CART_KEY, updated);
}

// ✅ Удалить товар
export function removeFromCart(title: string) {
  if (!isBrowser()) return;
  const updated = getCart().filter((p) => p.title !== title);
  saveToStorage(CART_KEY, updated);
}

// ✅ Очистить корзину
export function clearCart() {
  if (!isBrowser()) return;
  saveToStorage(CART_KEY, []);
}

// ✅ Подсчитать итог
export function getTotal(): number {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}