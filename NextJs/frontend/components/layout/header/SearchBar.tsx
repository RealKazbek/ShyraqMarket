"use client";
import Image from "next/image";
import searchIcon from "@/public/icons/ui/search.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zа-я0-9-]/gi, "");

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search/${toSlug(query)}`);
  };

  return (
    <div className="hidden md:flex items-center border rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Поиск..."
        className="px-3 py-2 outline-none w-48 sm:w-64 text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button
        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 rounded-none"
        size="lg"
        onClick={handleSearch}
      >
        <Image src={searchIcon} alt="search" width={16} height={16} />
        Найти
      </Button>
    </div>
  );
}
