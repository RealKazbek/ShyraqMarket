// Серверная часть (рендерит HTML)
import HeaderClient from "./HeaderClient";
import Link from "next/link";

export default function HeaderServer() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-8 py-3 max-w-8xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-emerald-700"
        >
          SHYRAQ MARKET
        </Link>
        <HeaderClient />
      </div>
    </header>
  );
}
