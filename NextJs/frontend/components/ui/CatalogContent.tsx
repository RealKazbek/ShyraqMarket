"use client";

import { memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import closeIcon from "@/public/icons/system/close.svg";
import catalogIcon from "@/public/icons/system/catalog.svg";

type CatalogContentProps = {
  onClose: () => void;
  onSelect: (path: string) => void;
};

function CatalogContentComponent({ onClose, onSelect }: CatalogContentProps) {
  return (
    <div
      className="fixed flex inset-0 z-50 bg-black/50 justify-start"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-72 h-full p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-left"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-emerald-700 flex items-center gap-2">
            <div className="bg-black p-2 rounded-sm">
              <Image src={catalogIcon} alt="catalog" width={20} height={20} />
            </div>
            Каталог
          </h3>
          <button onClick={onClose} aria-label="Close catalog">
            <Image src={closeIcon} alt="close" width={20} height={20} />
          </button>
        </div>

        {/* Категории каталога */}
        <Button
          onClick={() => onSelect("the best of the month")}
          className="justify-start"
        >
          🔥 Лучшее за месяц
        </Button>
        <Button
          onClick={() => onSelect("electronics")}
          className="justify-start"
        >
          💻 Электроника
        </Button>
        <Button onClick={() => onSelect("clothes")} className="justify-start">
          👕 Одежда
        </Button>
        <Button onClick={() => onSelect("home")} className="justify-start">
          🏠 Для дома
        </Button>
        <Button onClick={() => onSelect("beauty")} className="justify-start">
          💄 Красота
        </Button>
      </div>
    </div>
  );
}

export const CatalogContent = memo(CatalogContentComponent);
