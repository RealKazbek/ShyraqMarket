"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import cartIcon from "@/public/icons/system/cart.svg";
import basketIcon from "@/public/icons/system/basket.svg";
import accountIcon from "@/public/icons/roles/account.svg";
import adminIcon from "@/public/icons/roles/adminSite.svg";
import deliveryIcon from "@/public/icons/roles/delivery.svg";
import crossIcon from "@/public/icons/system/close.svg";

type MenuContentProps = {
  user: {
    id: number;
    role: "ADMIN" | "USER" | "COURIER";
    avatar?: string | null;
  } | null;
  onClose: () => void;
  onOpenAuth: () => void;
  onRoute: (path: string) => void;
  onAdmin?: () => void;
  onCourier?: () => void;
};

export function MenuContent({
  user,
  onClose,
  onOpenAuth,
  onRoute,
  onAdmin,
  onCourier,
}: MenuContentProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex xl:hidden bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-72 bg-white p-6 flex flex-col gap-4 shadow-2xl
                   animate-in fade-in slide-in-from-right rounded-l-xl border-l border-gray-200"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-emerald-700">Меню</h3>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 hover:bg-gray-100 rounded-md transition"
          >
            <Image src={crossIcon} alt="close" width={20} height={20} />
          </button>
        </div>

        <Button onClick={() => onRoute("/order")} className="justify-start">
          <Image src={basketIcon} alt="orders" width={16} height={16} />
          <span>Мои заказы</span>
        </Button>

        <Button onClick={() => onRoute("/cart")} className="justify-start">
          <Image src={cartIcon} alt="cart" width={16} height={16} />
          <span>Корзина</span>
        </Button>

        {user?.role === "ADMIN" && (
          <Button onClick={onAdmin} className="justify-start">
            <Image src={adminIcon} alt="admin" width={16} height={16} />
            <span>Админ</span>
          </Button>
        )}

        {["ADMIN", "COURIER"].includes(user?.role || "") && (
          <Button onClick={onCourier} className="justify-start">
            <Image src={deliveryIcon} alt="courier" width={16} height={16} />
            <span>Курьер</span>
          </Button>
        )}

        <div className="mt-auto border-t pt-4">
          {user ? (
            <Link href="/account" onClick={onClose}>
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar || accountIcon}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full border object-cover"
                />
                <span className="font-medium">Мой аккаунт</span>
              </div>
            </Link>
          ) : (
            <Button className="w-full" onClick={onOpenAuth}>
              Войти
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
