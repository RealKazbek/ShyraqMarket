"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  shipping: string;
  promo: boolean;
  status: "processing" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
  deliveryOption?: "home" | "branch";
};

const steps = [
  "Заказ оформлен",
  "Отправлен из Китая",
  "Прибыл в Казахстан",
  "Доставка курьером",
  "Доставлен",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = loadFromStorage<Order[]>("orders", []);
    setOrders(stored);
  }, []);

  useEffect(() => {
    if (orders.length === 0) return;

    const timer = setInterval(() => {
      setOrders((prev) => {
        const updated: Order[] = prev.map((o) => {
          if (o.status === "processing")
            return { ...o, status: "confirmed" as Order["status"] };
          if (o.status === "confirmed")
            return { ...o, status: "shipped" as Order["status"] };
          if (o.status === "shipped")
            return { ...o, status: "delivered" as Order["status"] };
          return o;
        });
        saveToStorage("orders", updated);
        return updated;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [orders]);

  const getStepIndex = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return 0;
      case "confirmed":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 4;
      default:
        return 0;
    }
  };

  const chooseDeliveryOption = (orderId: string, option: "home" | "branch") => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === orderId ? { ...o, deliveryOption: option } : o
      );
      saveToStorage("orders", updated);
      return updated;
    });
    alert(
      option === "home"
        ? "🚚 Курьер привезёт заказ к вам домой"
        : "📦 Заберите заказ в ближайшем филиале"
    );
  };

  return (
    <div className="px-6 py-10 space-y-8">
      <h2 className="text-2xl font-bold">Мои заказы</h2>

      {orders.length === 0 && <p className="text-gray-500">Заказов нет</p>}

      {orders.map((order) => {
        const stepIndex = getStepIndex(order.status);

        return (
          <Card key={order.id}>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Заказ #{order.id}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Доставка:{" "}
                  {order.shipping === "standard" ? "Стандарт" : "Экспресс"}
                  {order.promo && " + Промо HALYK OIY"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Дата: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold">
                  Итого: {order.total.toFixed(2)} ₸
                </span>
                <span className="text-sm text-muted-foreground">
                  Статус: {steps[stepIndex]}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Steps */}
              <div className="flex items-center justify-between">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center flex-1"
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                      ${
                        i <= stepIndex
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-xs mt-2">{step}</span>
                  </div>
                ))}
              </div>

              {/* Items */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-1 text-sm"
                  >
                    <span>
                      {item.title} × {item.qty}
                    </span>
                    <span>{(item.price * item.qty).toFixed(2)} ₸</span>
                  </div>
                ))}
              </div>

              {/* Когда заказ доставлен → выбор опции */}
              {order.status === "delivered" && !order.deliveryOption && (
                <div className="space-y-3">
                  <p className="font-medium">Выберите способ получения:</p>
                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={() => chooseDeliveryOption(order.id, "home")}
                    >
                      🏠 Доставка в дом
                    </Button>
                    <Button
                      className="flex-1"
                      variant="outline"
                      onClick={() => chooseDeliveryOption(order.id, "branch")}
                    >
                      📦 Забрать из филиала
                    </Button>
                  </div>
                </div>
              )}

              {order.deliveryOption && (
                <p className="text-emerald-600 font-medium">
                  ✅ Вы выбрали:{" "}
                  {order.deliveryOption === "home"
                    ? "Доставка в дом"
                    : "Забрать из филиала"}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
