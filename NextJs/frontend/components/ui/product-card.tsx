"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Check } from "lucide-react";
import clsx from "clsx";
import {
  addToCart,
  toggleFavorite,
  getCart,
  getFavorites,
} from "@/lib/storage";

interface ProductCardProps {
  title: string;
  price: number;
  discount?: number;
  tags?: string[];
}

export default function ProductCard({
  title,
  price,
  discount,
  tags = [],
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);

  const backgrounds = [
    "bg-gradient-to-br from-emerald-200 to-lime-200",
    "bg-gradient-to-br from-sky-200 to-indigo-200",
    "bg-gradient-to-br from-rose-200 to-orange-200",
  ];

  // 🧠 Проверяем localStorage при загрузке
  useEffect(() => {
    const cart = getCart();
    const favorites = getFavorites();

    setInCart(cart.some((item) => item.title === title));
    setInFavorite(favorites.some((item) => item.title === title));
  }, [title]);

  // 🛒 Добавление / удаление из корзины
  const handleAddToCart = () => {
    const cart = getCart();
    const exists = cart.some((item) => item.title === title);

    if (exists) {
      const updated = cart.filter((item) => item.title !== title);
      localStorage.setItem("cart", JSON.stringify(updated));
      setInCart(false);
    } else {
      addToCart({ title, price, quantity: 1 });
      setInCart(true);
    }
  };

  // ❤️ Добавление / удаление из избранного
  const handleFavorite = () => {
    const added = toggleFavorite({ title, price });
    setInFavorite(added);
  };

  // 🌈 Анимация фона
  useEffect(() => {
    if (!hovered) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        "group w-full flex flex-col border border-gray-200 overflow-hidden rounded-xl md:rounded-2xl relative transition-all duration-500 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
      )}
    >
      {/* Верхняя часть */}
      <div
        className={clsx(
          "relative flex-1 transition-all duration-700 ease-in-out flex items-center justify-center min-h-[170px] sm:min-h-[220px] md:min-h-[260px]",
          backgrounds[bgIndex]
        )}
      >
        {/* Сердечко */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 rounded-full p-2 bg-white/70 hover:bg-white shadow-sm"
        >
          <Heart
            size={18}
            className={clsx(
              "cursor-pointer transition-transform duration-300 hover:animate-pulse hover:scale-125",
              inFavorite ? "text-rose-600 fill-rose-600" : "text-rose-600"
            )}
          />
        </button>

        {/* Теги */}
        <div className="absolute bottom-2 left-2 flex flex-col gap-1">
          {discount && (
            <span className="bg-rose-500 text-white text-xs font-semibold px-2 py-0.5 rounded-xl">
              -{discount}%
            </span>
          )}
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-xl"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Контент */}
      <CardContent className="flex flex-col justify-between px-1.5 md:p-3 sm:p-4 bg-white">
        <div className="space-y-1">
          <p className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 min-h-[38px]">
            {title}
          </p>
          <p className="text-lg sm:text-xl font-semibold text-emerald-700">
            {price.toLocaleString()} ₽
          </p>
        </div>

        <Button
          onClick={handleAddToCart}
          variant="default"
          size="sm"
          className={clsx(
            "sm:mt-3 w-full font-medium flex items-center justify-center gap-1 transition-all",
            inCart
              ? "bg-gray-300 hover:bg-gray-400 text-gray-700"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          )}
        >
          {inCart ? (
            <>
              <Check size={16} /> В корзине
            </>
          ) : (
            <>
              <ShoppingCart size={16} /> В корзину
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
