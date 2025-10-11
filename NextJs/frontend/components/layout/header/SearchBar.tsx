"use client";
import Image from "next/image";
import searchIcon from "@/public/icons/ui/search.svg";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center border rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Поиск..."
        className="px-3 py-2 outline-none w-48 sm:w-64 text-sm"
      />
      <Button
        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
        size={"lg"}
      >
        <Image src={searchIcon} alt="search" width={16} height={16} />
        Найти
      </Button>
    </div>
  );
}
