import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import accountIcon from "@/public/icons/roles/account.svg";
import adminIcon from "@/public/icons/roles/adminSite.svg";
import basketIcon from "@/public/icons/system/basket.svg";
import cartIcon from "@/public/icons/system/cart.svg";
import deliveryIcon from "@/public/icons/roles/delivery.svg";
import closeIcon from "@/public/icons/system/close.svg";

type MenuContentProps = {
  user: {
    id: number;
    role: "ADMIN" | "USER" | "COURIER";
    avatar?: string | null;
  } | null;
  onClose: () => void;
  onOpenAuth: () => void;
  onRoute: (path: string) => void;
  onAdmin: () => void;
  onCourier: () => void;
};

function MenuContentComponent({
  user,
  onClose,
  onOpenAuth,
  onRoute,
  onAdmin,
  onCourier,
}: MenuContentProps) {
  return (
    <div
      className="fixed flex lg:hidden inset-0 z-50 bg-black/50 justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-72 h-full p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-right"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-emerald-700">Меню</h3>
          <button onClick={onClose} aria-label="Close menu">
            <Image src={closeIcon} alt="close" width={20} height={20} />
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

        <div className="mt-auto">
          {user ? (
            <Link href="/account" onClick={onClose}>
              <div className="flex items-center gap-3 border-t pt-4">
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
            <Button
              className="w-full"
              onClick={() => {
                onOpenAuth();
                onClose();
              }}
            >
              Войти
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export const MenuContent = memo(
  MenuContentComponent,
  (prev, next) =>
    prev.user?.id === next.user?.id &&
    prev.user?.role === next.user?.role &&
    prev.onClose === next.onClose &&
    prev.onOpenAuth === next.onOpenAuth
);
