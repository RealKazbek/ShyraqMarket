"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  // InputGroupText,
  // InputGroupTextarea,
} from "@/components/ui/input-group";
import search from "@/public/search.svg";
import Image from "next/image";
import Login from "./login";
import Link from "next/link";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b">
      <Link href="/" className="text-nowrap cursor-pointer font-bold">
        SHYRAQ MARKET
      </Link>

      <div className="flex items-center gap-12">
        {/* Кнопка Каталог */}
        <div className="relative">
          <Button onClick={() => setIsCatalogOpen(!isCatalogOpen)}>
            Каталог
          </Button>

          {isCatalogOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white border shadow-lg z-50">
              <span className="px-4 py-2 rounded-xl font-bold text-red-500">
                Извините пока не работает
              </span>
              {/* <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Мобильные телефоны
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Компьютеры
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Электроника
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Бытовая техника
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Одежда
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Обувь
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Спорт и развлечения
                </li>
              </ul> */}
            </div>
          )}
        </div>

        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Image src={search} alt="" width={16} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <div className="flex items-center gap-6">
          <Link href={"/order"}>
            <Button>Заказы</Button>
          </Link>
          <Link href="/cart">
            <Button>Корзина</Button>
          </Link>
          <Button onClick={() => setIsLoginOpen(!isLoginOpen)}>Войти</Button>
        </div>
      </div>
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </header>
  );
}

export default Header;
