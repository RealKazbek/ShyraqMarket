"use client";
import Image from "next/image";
import searchIcon from "@/public/icons/ui/search.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
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
    <div className="flex mb-5 md:hidden items-center justify-between border rounded-lg overflow-hidden w-full">
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full px-3 py-2 outline-none text-sm"
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
