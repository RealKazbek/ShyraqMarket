"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CheckoutSections() {
  return (
    <div className="space-y-6">
      {/* Способ доставки */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">Способ доставки</h2>
          <Link
            href="#"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Выбрать адрес доставки
          </Link>
        </CardContent>
      </Card>

      {/* Способ оплаты + Мои данные */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Оплата */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Способ оплаты</h2>
            <p className="text-sm text-muted-foreground">
              <Link
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Войти или зарегистрироваться
              </Link>
              , чтобы выбрать способ оплаты
            </p>
          </CardContent>
        </Card>

        {/* Данные */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Мои данные</h2>
            <p className="text-sm text-muted-foreground">
              <Link
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Войти или зарегистрироваться
              </Link>
              , чтобы оформить заказ
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
