"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import type { Product } from "@/api/product";
import { addToCart } from "@/api/cart";

export default function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = async () => {
    try {
      await addToCart(product.product_id, 1);
      alert("✅ Добавлен в корзину через API!");
    } catch (err) {
      console.error("Ошибка при добавлении в корзину:", err);
      alert("❌ Не удалось добавить в корзину. Возможно, вы не авторизованы.");
    }
  };

  return (
    <Card className="hover:shadow-lg transition flex flex-col">
      <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill // картинка занимает весь контейнер
            className="object-cover" // обрезает лишнее, сохраняя пропорции
            unoptimized
          />
        ) : (
          <span className="text-gray-400 flex items-center justify-center h-full">
            No Image
          </span>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-base line-clamp-2">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">{product.price} ₸</span>
        </div>

        <Button onClick={handleAddToCart} className="w-full mt-2">
          Добавить в корзину
        </Button>
      </CardContent>
    </Card>
  );
}
