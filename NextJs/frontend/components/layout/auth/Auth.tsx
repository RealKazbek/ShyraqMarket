"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { LoginForm } from "@/components/ui/login-form";
import { cn } from "@/lib/utils";
import closeIcon from "@/public/icons/system/close.svg";
import Image from "next/image";

type Props = {
  onClose: () => void;
};

export default function Auth({ onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mounted, onClose]);

  const handleOverlay = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      ref={dialogRef}
      onClick={handleOverlay}
      className={cn(
        "fixed inset-0 z-[10000] flex items-center justify-center",
        "bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200",
          "animate-in slide-in-from-bottom-6 md:slide-in-from-top-6 duration-200"
        )}
      >
        {/* 🔹 Close button */}
        <button
          aria-label="Закрыть окно авторизации"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
        >
          <Image src={closeIcon} alt="X" />
        </button>

        {/* 🔹 Inner form */}
        <div className="p-6 sm:p-8">
          <LoginForm onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  );
}
