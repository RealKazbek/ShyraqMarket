"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import clsx from "clsx";
import { CartItem } from "@/lib/storage";
import { getFavorites, toggleFavorite } from "@/lib/storage/favorites";

interface CartItemCardProps {
  item: CartItem;
  onChange: (title: string, delta: number) => void;
  onRemove: (title: string) => void;
}

export default function CartItemCard({
  item,
  onChange,
  onRemove,
}: CartItemCardProps) {
  const { title, price, quantity } = item;
  const [inFavorite, setInFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setInFavorite(favorites.some((p) => p.title === title));
  }, [title]);

  const handleFavorite = () => {
    const added = toggleFavorite({ title, price });
    setInFavorite(added);
  };

  return (
    <div
      className="
        flex flex-col sm:flex-row items-center justify-between
        gap-4 sm:gap-6 p-4 border rounded-xl
        hover:shadow-sm hover:bg-gray-50 transition-all duration-300
      "
    >
      {/* Левая часть */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Квадрат с градиентом */}
        <div
          className="
            relative flex items-center justify-center
            w-[100px] h-[100px] sm:w-[110px] sm:h-[110px]
            rounded-lg overflow-hidden flex-shrink-0
            bg-gradient-to-br from-emerald-200 to-lime-200
            transition-all duration-500 ease-in-out
          "
        >
          {/* ❤️ Сердце */}
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 rounded-full p-1.5 bg-white/80 hover:bg-white shadow-sm transition"
          >
            <Heart
              size={16}
              className={clsx(
                "cursor-pointer transition-transform duration-300 hover:scale-125",
                inFavorite ? "text-rose-600 fill-rose-600" : "text-rose-600"
              )}
            />
          </button>
        </div>

        {/* Название и количество */}
        <div className="truncate">
          <h3 className="font-semibold text-base sm:text-lg leading-snug">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Количество: {quantity}</p>
        </div>
      </div>

      {/* Правая часть */}
      <div
        className="
          flex items-center justify-between sm:justify-end
          gap-4 w-full sm:w-auto
        "
      >
        {/* +/- */}
        <div className="flex items-center border rounded-lg overflow-hidden">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => onChange(title, -1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-3 text-sm sm:text-base select-none">
            {quantity}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => onChange(title, +1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Цена */}
        <div className="text-right min-w-[80px] sm:min-w-[100px]">
          <p className="text-emerald-600 font-semibold text-sm sm:text-base whitespace-nowrap">
            {price * quantity} ₽
          </p>
          <p className="text-xs sm:text-sm text-gray-400">{price} ₽ / шт</p>
        </div>

        {/* 🗑 Удалить */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-destructive"
          onClick={() => onRemove(title)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
