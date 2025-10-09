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
import Image from "next/image";

import { getCart, addToCart, removeFromCart } from "@/api/cart";
import type { Cart } from "@/api/cart";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePromoApply = () => {
    if (promo.trim().toUpperCase() === "HALYK OIY") {
      setPromoApplied(true);
      alert("✅ Промокод применён! Скидка 10%");
    } else {
      setPromoApplied(false);
      alert("❌ Неверный промокод");
    }
  };
  // загрузка корзины из API
  useEffect(() => {
    getCart()
      .then((data) => setCart(data))
      .catch((err) => console.error("Ошибка загрузки корзины:", err));
  }, []);

  // изменение количества
  const updateQty = async (product_id: string, delta: number) => {
    const item = cart?.items.find((i) => i.product.product_id === product_id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    try {
      const updated = await addToCart(product_id, newQty - item.quantity);
      setCart(updated);
    } catch (err) {
      console.error("Ошибка обновления количества:", err);
    }
  };

  // удаление
  const removeItem = async (product_id: string) => {
    try {
      const updated = await removeFromCart(product_id);
      setCart(updated);
    } catch (err) {
      console.error("Ошибка удаления товара:", err);
    }
  };

  if (!cart) return <p>Загрузка...</p>;

  const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const itemsTotal = cart.items.reduce(
    (sum, item) => sum + item.quantity * Number(item.product.price),
    0
  );

  const shippingCost = shipping === "standard" ? 500 : 1500;
  const discount = promoApplied ? itemsTotal * 0.1 : 0;
  const total = itemsTotal - discount + shippingCost;

  return (
    <div className="px-6 py-10 grid grid-cols-1 items-start md:grid-cols-3 gap-8">
      {/* Cart items */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cart.items.length === 0 ? (
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
              {cart.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={64}
                          height={64}
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.product.title}</p>
                        <button
                          onClick={() => removeItem(item.product.product_id)}
                          className="cursor-pointer text-sm text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateQty(item.product.product_id, -1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        onClick={() => updateQty(item.product.product_id, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{item.product.price} ₸</TableCell>
                  <TableCell>
                    {(Number(item.product.price) * item.quantity).toFixed(2)} ₸
                  </TableCell>
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
              <span>Promo</span>
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
                placeholder="Промокод"
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
          <Button className="w-full">Checkout</Button>
        </CardContent>
      </Card>
    </div>
  );
}
