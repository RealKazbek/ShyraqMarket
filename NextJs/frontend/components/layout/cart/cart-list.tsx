"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  CartItem,
} from "@/lib/storage";
import CartItemCard from "@/components/ui/cart-item-card";

export default function CartList() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    refreshCart();
    window.addEventListener("cartUpdated", refreshCart);
    return () => window.removeEventListener("cartUpdated", refreshCart);
  }, []);

  function refreshCart() {
    setItems([...getCart()]);
  }

  function handleQuantityChange(title: string, delta: number) {
    updateQuantity(title, delta);
    window.dispatchEvent(new Event("cartUpdated"));
    refreshCart();
  }

  function handleRemove(title: string) {
    removeFromCart(title);
    window.dispatchEvent(new Event("cartUpdated"));
    refreshCart();
  }

  if (items.length === 0) {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-8 text-center text-muted-foreground">
          <p className="text-lg">🛒 Ваша корзина пуста</p>
          <p className="text-sm mt-2">Добавьте товары из каталога</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Корзина</h1>
        <p className="text-muted-foreground mb-6">
          {items.length} {items.length === 1 ? "товар" : "товара"}
        </p>

        <div className="space-y-4">
          {items.map((item) => (
            <CartItemCard
              key={item.title}
              item={item}
              onChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
