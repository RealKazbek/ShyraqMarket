"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import Image from "next/image";

type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string; // добавил
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  shipping: string;
  promo: boolean;
  status: "processing" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage<CartItem[]>("cart", []);
    setCart(stored);
  }, []);

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      );
      saveToStorage("cart", updated);
      return updated;
    });
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    saveToStorage("cart", updated);
  };

  const itemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const itemsTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const shippingCost = shipping === "standard" ? 500 : 1500;
  const discount = promoApplied ? itemsTotal * 0.1 : 0;
  const total = itemsTotal - discount + shippingCost;

  const handlePromoApply = () => {
    if (promo.trim().toUpperCase() === "HALYK OIY") {
      setPromoApplied(true);
      alert("✅ Промокод применён! Скидка 10%");
    } else {
      setPromoApplied(false);
      alert("❌ Неверный промокод");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Корзина пуста");
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart,
      total,
      shipping,
      promo: promoApplied,
      status: "processing",
      createdAt: new Date().toISOString(),
    };

    // достаём старые заказы
    const orders = loadFromStorage<Order[]>("orders", []);
    // добавляем новый
    saveToStorage("orders", [newOrder, ...orders]);
    // чистим корзину
    saveToStorage("cart", []);
    setCart([]);

    alert(`Заказ #${newOrder.id} оформлен!`);
  };

  return (
    <div className="px-6 py-10 grid grid-cols-1 items-start md:grid-cols-3 gap-8">
      {/* Cart items */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Корзина пуста</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={64}
                          height={64}
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="font-medium text-wrap max-w-125">
                          {item.title}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => updateQty(item.id, -1)}>
                        -
                      </Button>
                      <span>{item.qty}</span>
                      <Button size="sm" onClick={() => updateQty(item.id, 1)}>
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{item.price} ₸</TableCell>
                  <TableCell>{(item.price * item.qty).toFixed(2)} ₸</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Order summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Items ({itemsCount})</span>
            <span>{itemsTotal.toFixed(2)} ₸</span>
          </div>

          {promoApplied && (
            <div className="flex justify-between text-green-600">
              <span>Promo (HALYK OIY)</span>
              <span>-{discount.toFixed(2)} ₸</span>
            </div>
          )}

          <div>
            <span className="block mb-1">Shipping</span>
            <Select
              value={shipping}
              onValueChange={(val) =>
                setShipping(val as "standard" | "express")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard – 500 ₸</SelectItem>
                <SelectItem value="express">Express – 1500 ₸</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <span className="block mb-1">Promo Code</span>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
              />
              <Button onClick={handlePromoApply}>Apply</Button>
            </div>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{total.toFixed(2)} ₸</span>
          </div>

          <Button className="w-full" onClick={handleCheckout}>
            Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
