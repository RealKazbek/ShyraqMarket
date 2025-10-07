"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { appendToList } from "@/lib/storage";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const handleAddToCart = () => {
    appendToList("cart", { ...product, qty: 1 });
  };

  return (
    <Card className="hover:shadow-lg transition flex flex-col">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
        IMG
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{product.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1">
        <p className="text-sm text-gray-500">{product.description}</p>

        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">{product.price} ₸</span>
          <span className="line-through text-gray-400 text-sm">
            {product.oldPrice} ₸
          </span>
          <span className="text-red-500 text-sm">-{discount}%</span>
        </div>

        <Button onClick={handleAddToCart} className="w-full mt-2">
          Добавить в корзину
        </Button>
      </CardContent>
    </Card>
  );
}
