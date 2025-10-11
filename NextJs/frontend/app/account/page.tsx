"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { logout } from "@/api/auth";
import { getCart, Cart } from "@/api/cart";
import Image from "next/image";

interface User {
  id: number;
  username: string;
  phone: string;
  address: string | null;
  role: string;
  avatar: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const userData = localStorage.getItem("user");

    if (!access || !userData) {
      router.push("/");
      return;
    }

    try {
      const parsed: User = JSON.parse(userData);
      setUser(parsed);

      // загрузить корзину
      (async () => {
        const cartData = await getCart();
        setCart(cartData);
      })();
    } catch (err) {
      console.error("Ошибка парсинга user:", err);
      router.push("/");
    }
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start md:flex-row bg-muted/30">
      {/* Sidebar */}
      <Card className="md:w-1/4 m-4 flex flex-col items-center text-center py-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{user.username}</h2>
        <p className="text-sm text-muted-foreground">{user.phone}</p>
        <p className="text-xs text-muted-foreground">Role: {user.role}</p>

        <Separator className="my-4 w-3/4" />

        <div className="w-full flex flex-col gap-3 px-6">
          <Button variant="outline" onClick={() => router.push("/")}>
            Главная
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-3 sm:w-1/2 mb-6">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="cart">Корзина</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <Card className="p-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Информация профиля</h3>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Имя:</strong> {user.username}
                </p>
                <p>
                  <strong>Телефон:</strong> {user.phone}
                </p>
                <p>
                  <strong>Роль:</strong> {user.role}
                </p>
                <p>
                  <strong>Адрес:</strong> {user.address || "Не указан"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 🛒 Cart */}
          <TabsContent value="cart">
            <Card className="p-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Моя корзина</h3>
              </CardHeader>
              <CardContent>
                {!cart || cart.items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Корзина пуста</p>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <Card
                        key={item.id}
                        className="flex items-center gap-4 p-4"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={80} // ✅ обязательно
                          height={80}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.product.price} ₸ × {item.quantity}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => console.log("remove", item.product.id)}
                        >
                          Удалить
                        </Button>
                      </Card>
                    ))}
                    <Separator />
                    <p className="text-right font-semibold">
                      Итого: {cart.total_price} ₸
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card className="p-6 h-full">
              <CardHeader>
                <h3 className="text-lg font-semibold">Настройки аккаунта</h3>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Button variant="outline">Изменить имя</Button>
                <Button variant="outline">Изменить номер</Button>
                <Button variant="outline">Изменить адрес</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
