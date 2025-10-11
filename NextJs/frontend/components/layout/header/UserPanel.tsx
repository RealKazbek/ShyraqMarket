"use client";

import { useState, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MenuContent } from "@/components/ui/menu-content";
import { loadFromStorage } from "@/lib/storage";

import cartIcon from "@/public/icons/system/cart.svg";
import basketIcon from "@/public/icons/system/basket.svg";
import accountIcon from "@/public/icons/roles/account.svg";
import menuIcon from "@/public/icons/system/menu.svg";
import adminIcon from "@/public/icons/roles/adminSite.svg";
import deliveryIcon from "@/public/icons/roles/delivery.svg";

const LoginModal = dynamic(() => import("@/components/layout/auth/Auth"), {
  ssr: false,
});

// 🔹 Тип пользователя
export type User = {
  id: number;
  role: "ADMIN" | "USER" | "COURIER";
  avatar?: string | null;
};

// 🔹 Пропсы компонента (чтобы memo их знал)
export type UserPanelProps = Record<string, never>;

function UserPanelBase(_props: UserPanelProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    setUser(loadFromStorage<User | null>("user", null));

    const handleLogin = () => setUser(loadFromStorage("user", null));
    const handleLogout = () => setUser(null);

    window.addEventListener("userLoggedIn", handleLogin);
    window.addEventListener("userLoggedOut", handleLogout);

    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
      window.removeEventListener("userLoggedOut", handleLogout);
    };
  }, []);

  const handleProtectedRoute = (path: string) => {
    if (user && localStorage.getItem("access")) router.push(path);
    else setIsAuthOpen(true);
  };

  return (
    <>
      {/* 🔹 Desktop */}
      <div className="hidden xl:flex items-center gap-2 sm:gap-3">
        {user?.role === "ADMIN" && (
          <Button
            onClick={() => handleProtectedRoute("/admin")}
            className="flex items-center gap-2"
          >
            <Image src={adminIcon} alt="admin" width={16} height={16} />
            <span>Admin</span>
          </Button>
        )}

        {["ADMIN", "COURIER"].includes(user?.role || "") && (
          <Button
            onClick={() => handleProtectedRoute("/courier")}
            className="flex items-center gap-2"
          >
            <Image src={deliveryIcon} alt="courier" width={16} height={16} />
            <span>Courier</span>
          </Button>
        )}

        <Button onClick={() => handleProtectedRoute("/order")}>
          <Image src={basketIcon} alt="orders" width={16} height={16} />
        </Button>

        <Button onClick={() => handleProtectedRoute("/cart")}>
          <Image src={cartIcon} alt="cart" width={16} height={16} />
        </Button>

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
          <Button size="sm" onClick={() => setIsAuthOpen(true)}>
            Войти
          </Button>
        )}
      </div>

      {/* 🔹 Mobile */}
      <div className="flex xl:hidden">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
          aria-label="Open menu"
        >
          <Image src={menuIcon} alt="menu" width={22} height={22} />
        </button>
      </div>

      {mounted &&
        isMenuOpen &&
        createPortal(
          <MenuContent
            user={user}
            onClose={() => setIsMenuOpen(false)}
            onOpenAuth={() => {
              setIsAuthOpen(true);
              setIsMenuOpen(false);
            }}
            onRoute={handleProtectedRoute}
            onAdmin={() => router.push("/admin")}
            onCourier={() => router.push("/courier")}
          />,
          document.body
        )}

      {isAuthOpen && <LoginModal onClose={() => setIsAuthOpen(false)} />}
    </>
  );
}

// ✅ Оборачиваем в memo и типизируем prev/next
export const UserPanel = memo<UserPanelProps>(UserPanelBase, () => true);

export default UserPanel;
