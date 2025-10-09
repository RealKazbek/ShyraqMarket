"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import search from "@/public/search.svg";
import Image from "next/image";
import Login from "./login";
import Link from "next/link";
import account from "@/public/account.svg";
import cart from "@/public/cart.svg";
import basket from "@/public/basket.svg";
import catalog from "@/public/catalog.svg";
import delivery from "@/public/delivery.svg";
import admin from "@/public/adminSite.svg";
import { useRouter } from "next/navigation";
import { getMe } from "@/api/auth";

type User = {
  id: number;
  username?: string;
  role: "ADMIN" | "USER" | "COURIER";
  avatar?: string | null;
};

function Header() {
  const router = useRouter();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    function handleLogin() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    function handleLogout() {
      setUser(null);
    }

    window.addEventListener("userLoggedIn", handleLogin);
    window.addEventListener("userLoggedOut", handleLogout);

    handleLogin();

    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
      window.removeEventListener("userLoggedOut", handleLogout);
    };
  }, []);

  async function handleAdmin() {
    try {
      const me = await getMe(localStorage.getItem("access") || "");
      if (me.role === "ADMIN") {
        router.push("/admin");
      } else {
        alert("Бан захотелось?");
      }
    } catch (error) {
      console.error("Ошибка при проверке роли:", error);
      alert("Не удалось получить данные пользователя");
    }
  }

  async function handleCourier() {
    try {
      const me = await getMe(localStorage.getItem("access") || "");
      if (me.role === "ADMIN" || me.role === "COURIER") {
        router.push("/courier");
      } else {
        alert("Бан захотелось?");
      }
    } catch (error) {
      console.error("Ошибка при проверке роли:", error);
      alert("Не удалось получить данные пользователя");
    }
  }

  function handleOrdersClick() {
    if (user) {
      router.push("/order");
    } else {
      setIsLoginOpen(true);
    }
  }

  function handleCartClick() {
    if (user) {
      router.push("/cart");
    } else {
      setIsLoginOpen(true);
    }
  }

  return (
    <header className="flex items-center px-6 py-4 border-b">
      <Link href="/" className="font-bold whitespace-nowrap">
        SHYRAQ MARKET
      </Link>

      {/* Центр: Каталог + Поиск */}
      <div className="flex-1 flex items-center justify-center gap-4 px-4">
        <div className="relative">
          <Button onClick={() => setIsCatalogOpen(!isCatalogOpen)}>
            <Image width={16} height={16} src={catalog} alt="" />
            Каталог
          </Button>
          {isCatalogOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white border shadow-lg z-50">
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href="/">Топ товары</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <InputGroup className="max-w-md flex-1">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Image src={search} alt="" width={16} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Правый блок */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {user?.role === "ADMIN" && (
          <Button onClick={handleAdmin}>
            <Image width={16} height={16} src={admin} alt="" />
            Admin
          </Button>
        )}

        {["COURIER", "ADMIN"].includes(user?.role || "USER") && (
          <Button onClick={handleCourier}>
            <Image width={16} height={16} src={delivery} alt="" />
            Courier
          </Button>
        )}

        <Button onClick={handleOrdersClick}>
          <Image width={16} height={16} src={basket} alt="" />
          Заказы
        </Button>
        <Button onClick={handleCartClick}>
          <Image width={16} height={16} src={cart} alt="" />
          Корзина
        </Button>
        {user ? (
          <Link
            href={"/account"}
            className="flex items-center justify-center w-10 h-10"
          >
            <Image
              width={40}
              height={40}
              src={user.avatar || account}
              alt="avatar"
              className="rounded-full border object-cover"
            />
          </Link>
        ) : (
          <Button onClick={() => setIsLoginOpen(true)}>
            <Image width={16} height={16} src={account} alt="" />
            Войти
          </Button>
        )}
      </div>

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </header>
  );
}

export default Header;
