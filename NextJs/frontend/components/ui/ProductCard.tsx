"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { appendToList } from "@/lib/storage";
import Image from "next/image";

import type { Product } from "@/api/product";

export default function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = () => {
    appendToList("cart", {
      id: product.id,
      title: product.title,
      price: parsePrice(product.price), // ✅ только число
      qty: 1,
      image: product.image,
    });

    alert("Добавлен в корзину!");
  };

  function parsePrice(price: string): number {
    return parseFloat(price.replace(/[^\d.-]/g, ""));
  }

  return (
    <Card className="hover:shadow-lg transition flex flex-col">
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            unoptimized
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-base line-clamp-2">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">{parseFloat(product.price.replace(/[^\d.-]/g, ""))} ₸</span>
        </div>

        <Button onClick={handleAddToCart} className="w-full mt-2">
          Добавить в корзину
        </Button>
      </CardContent>
    </Card>
  );
}
