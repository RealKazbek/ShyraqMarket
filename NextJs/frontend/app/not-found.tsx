"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16 sm:px-6">
      <span className="text-[140px] sm:text-[180px] md:text-[220px] font-black text-emerald-700 italic leading-none">
        404
      </span>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-2">
        Page not found
      </h1>

      <p className="text-gray-600 max-w-md text-sm sm:text-base mb-6">
        The page may have been removed or the address was entered incorrectly.
      </p>

      <Link href="/" className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto px-6 py-2 text-base sm:text-lg">
          Back to home
        </Button>
      </Link>
    </main>
  );
}
