"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import cartIcon from "@/public/icons/system/cart.svg";
import basketIcon from "@/public/icons/system/basket.svg";
import accountIcon from "@/public/icons/roles/account.svg";
import { loadFromStorage } from "@/lib/storage";

type User = {
  id: number;
  role: "ADMIN" | "USER" | "COURIER";
  avatar?: string | null;
};

export default function UserPanel() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(loadFromStorage<User | null>("user", null));
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link href="/order">
        <Image
          className="bg-gray-700 w-8 p-2 rounded-sm"
          src={basketIcon}
          alt="orders"
          width={18}
          height={18}
        />
      </Link>
      <Link href="/cart">
        <Image
          className="bg-gray-700 w-8 p-2 rounded-sm"
          src={cartIcon}
          alt="cart"
          width={18}
          height={18}
        />
      </Link>
      {user ? (
        <Link href="/account">
          <Image
            src={user.avatar || accountIcon}
            alt="avatar"
            width={34}
            height={34}
            className="rounded-full border object-cover"
          />
        </Link>
      ) : (
        <Button size="sm">Войти</Button>
      )}
    </div>
  );
}
