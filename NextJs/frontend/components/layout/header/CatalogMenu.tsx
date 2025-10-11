"use client";

import { useState, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import catalogIcon from "@/public/icons/system/catalog.svg";
import { CatalogContent } from "@/components/ui/CatalogContent";

function CatalogMenuBase() {
  const router = useRouter();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Проверяем, что компонент отрендерился на клиенте
  useEffect(() => setMounted(true), []);

  // Блокируем скролл при открытом каталоге
  useEffect(() => {
    document.body.style.overflow = isCatalogOpen ? "hidden" : "auto";
  }, [isCatalogOpen]);

  const handleSelect = (path: string) => {
    setIsCatalogOpen(false);
    router.push(`/catalog/${encodeURIComponent(path)}`);
  };

  return (
    <>
      {/* Кнопка открытия каталога */}
      <Button
        onClick={() => setIsCatalogOpen(true)}
        className="flex items-center gap-2"
        size={"lg"}
      >
        <Image src={catalogIcon} alt="catalog" width={24} height={24} />
        Каталог
      </Button>

      {/* Портал каталога */}
      {mounted &&
        isCatalogOpen &&
        createPortal(
          <CatalogContent
            onClose={() => setIsCatalogOpen(false)}
            onSelect={handleSelect}
          />,
          document.body
        )}
    </>
  );
}

export const CatalogMenu = memo(CatalogMenuBase, () => true);
export default CatalogMenu;
