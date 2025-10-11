"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import catalogIcon from "@/public/icons/system/catalog.svg";

export default function CatalogMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button onClick={() => setOpen(!open)}>
        <Image src={catalogIcon} alt="catalog" width={16} height={16} />
        Каталог
      </Button>
      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-white border rounded-xl shadow-md">
          <ul className="flex flex-col">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Топ товары
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Электроника
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Одежда
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
