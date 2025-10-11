// Серверная часть (рендерит HTML)
import HeaderClient from "./HeaderClient";
import Link from "next/link";

export default function HeaderServer() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="flex justify-between items-center px-3 md:px-6 sm:px-9 lg:px-12 py-6 max-w-8xl mx-auto">
        <Link
          href="/"
          className="flex text-md md:text-lg lg:text-3xl items-center gap-2 font-bold text-emerald-700"
        >
          SHYRAQ MARKET
        </Link>
        <HeaderClient />
      </div>
    </header>
  );
}
