"use client";
import Image from "next/image";
import searchIcon from "@/public/icons/ui/search.svg";

export default function SearchBar() {
  return (
    <div className="hidden sm:flex items-center border rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Поиск..."
        className="px-3 py-2 outline-none w-48 sm:w-64 text-sm"
      />
      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 flex items-center gap-2">
        <Image src={searchIcon} alt="search" width={16} height={16} />
        Найти
      </button>
    </div>
  );
}
