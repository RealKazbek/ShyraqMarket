"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCart, getTotal } from "@/lib/storage/index";

export default function CartSummary() {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    updateSummary();
    window.addEventListener("cartUpdated", updateSummary);
    return () => window.removeEventListener("cartUpdated", updateSummary);
  }, []);

  function updateSummary() {
    setTotal(getTotal());
    setCount(getCart().length);
  }

  return (
    <div className="lg:sticky lg:top-[96px] transition-all">
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Выбрать адрес доставки</h3>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              Товары, {count} шт.
              <span className="float-right text-foreground font-medium">
                {total.toLocaleString()} ₽
              </span>
            </p>
            <p>
              Моя скидка
              <span className="float-right text-destructive">−7 711 ₽</span>
            </p>
            <p>
              Скидка WB Кошелька
              <span className="float-right text-destructive">−156 ₽</span>
            </p>
            <p>
              Доставка
              <span className="float-right">185 ₽</span>
            </p>
          </div>

          <Separator />

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Итого</span>
            <span className="text-foreground">
              {(total - 7111 - 156 + 185).toLocaleString()} ₽
            </span>
          </div>

          <Button
            size="lg"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-base rounded-xl"
          >
            Заказать
          </Button>

          <p className="text-xs text-muted-foreground text-center leading-snug">
            Соглашаюсь с правилами пользования торговой площадкой и возврата
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
