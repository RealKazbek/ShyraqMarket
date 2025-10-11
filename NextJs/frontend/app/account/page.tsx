"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/api/auth";

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
    <div className="flex flex-col md:flex-row bg-muted/30">
      {/* Sidebar */}
      <Card className="md:w-1/3 lg:w-1/4 w-full m-4 flex flex-col items-center text-center py-8 shadow-sm">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{user.username}</h2>
        <p className="text-sm text-muted-foreground break-all">{user.phone}</p>
        <p className="text-xs text-muted-foreground mt-1">Роль: {user.role}</p>

        <Separator className="my-4 w-3/4" />

        <div className="w-full flex flex-col gap-3 px-6">
          <Button
            variant="outline"
            className="w-full text-sm sm:text-base"
            onClick={() => router.push("/")}
          >
            Главная
          </Button>
          <Button
            variant="destructive"
            className="w-full text-sm sm:text-base"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </Card>

      {/* Tabs Section */}
      <div className="flex-1 p-4 sm:p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4 sm:mb-6">
            <TabsTrigger value="profile" className="text-sm sm:text-base">
              Профиль
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm sm:text-base">
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="p-4 sm:p-6">
              <CardHeader>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Информация профиля
                </h3>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base">
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

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-4 sm:p-6">
              <CardHeader>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Настройки аккаунта
                </h3>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Button variant="outline" className="flex-1 min-w-[150px]">
                  Изменить имя
                </Button>
                <Button variant="outline" className="flex-1 min-w-[150px]">
                  Изменить номер
                </Button>
                <Button variant="outline" className="flex-1 min-w-[150px]">
                  Изменить адрес
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}