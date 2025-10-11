import Image from "next/image";
import Link from "next/link";

import instagramIcon from "@/public/icons/misc/instagram.svg";
import telegramIcon from "@/public/icons/misc/telegram.svg";
import whatsappIcon from "@/public/icons/misc/whatsapp.svg";

export default function Footer() {
  return (
    <footer
      className="bg-gray-100 border-t mt-10 text-gray-800"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <nav
        aria-label="Footer navigation"
        className="max-w-6xl mx-auto px-6 py-10 grid text-center sm:text-left grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">Покупателям</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                Поддержка
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">Партнёрам</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                Инвесторам
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                Аффилиатная программа
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">О компании</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                Основатель
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                История
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">Мы в соцсетях</h4>
          <ul className="flex flex-col items-center sm:items-start space-y-3">
            {[
              {
                icon: instagramIcon,
                name: "Instagram",
                link: "https://instagram.com",
              },
              { icon: telegramIcon, name: "Telegram", link: "https://t.me" },
              { icon: whatsappIcon, name: "WhatsApp", link: "https://wa.me" },
            ].map((s) => (
              <li key={s.name}>
                <Link
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-600 transition"
                >
                  <Image
                    src={s.icon}
                    alt={s.name}
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t py-4 text-center text-sm text-gray-500">
        <p>© SHYRAQ MARKET 2025</p>
        <p className="flex flex-col sm:flex-row items-center justify-center gap-1 mt-1">
          <Link href="#" className="text-emerald-600 hover:underline">
            Политика конфиденциальности
          </Link>
          <span className="hidden sm:block">·</span>
          <Link href="#" className="text-emerald-600 hover:underline">
            Пользовательское соглашение
          </Link>
        </p>
      </div>
    </footer>
  );
}
