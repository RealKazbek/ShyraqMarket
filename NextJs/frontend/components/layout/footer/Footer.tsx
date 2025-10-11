import Image from "next/image";
import Link from "next/link";

import instagramIcon from "@/public/icons/misc/instagram.svg";
import telegramIcon from "@/public/icons/misc/telegram.svg";
import whatsappIcon from "@/public/icons/misc/whatsapp.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10 text-gray-800">
      {/* 🔹 Верхняя часть */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Покупателям */}
        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">Покупателям</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600">
                Поддержка
              </Link>
            </li>
          </ul>
        </div>

        {/* Партнёрам */}
        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">Партнёрам</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600">
                Инвесторам
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-600">
                Аффилиатная программа
              </Link>
            </li>
          </ul>
        </div>

        {/* О компании */}
        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">О компании</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600">
                Основатель
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-600">
                История
              </Link>
            </li>
          </ul>
        </div>

        {/* Соцсети */}
        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">Мы в соцсетях</h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-600 transition"
              >
                <Image
                  src={instagramIcon}
                  alt="Instagram"
                  width={20}
                  height={20}
                />
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-600 transition"
              >
                <Image
                  src={telegramIcon}
                  alt="Telegram"
                  width={20}
                  height={20}
                />
                Telegram
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-600 transition"
              >
                <Image
                  src={whatsappIcon}
                  alt="WhatsApp"
                  width={20}
                  height={20}
                />
                WhatsApp
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Нижняя полоса */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        <p>© SHYRAQ MARKET 2025</p>
        <p className="mt-1">
          <Link href="#" className="text-blue-600 hover:underline">
            Политика конфиденциальности
          </Link>{" "}
          ·{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Пользовательское соглашение
          </Link>
        </p>
      </div>
    </footer>
  );
}
