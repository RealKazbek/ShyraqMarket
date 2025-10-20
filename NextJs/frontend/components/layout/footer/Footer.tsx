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
        className="max-w-6xl mx-auto px-3 md:px-6 sm:px-9 lg:px-12 py-10 grid text-center sm:text-left grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">For Customers</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">For Partners</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                Investors
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                Affiliate Program
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">About Us</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                Founder
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-600 transition">
                History
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-emerald-700">Follow Us</h4>
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
        <p>© Shyraq Market 2025</p>
        <p className="flex flex-col sm:flex-row items-center justify-center gap-1 mt-1">
          <Link href="#" className="text-emerald-600 hover:underline">
            Privacy Policy
          </Link>
          <span className="hidden sm:block">·</span>
          <Link href="#" className="text-emerald-600 hover:underline">
            Terms of Use
          </Link>
        </p>
      </div>
    </footer>
  );
}
