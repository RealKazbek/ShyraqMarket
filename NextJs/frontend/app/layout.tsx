import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import HeaderServer from "@/components/layout/header/HeaderServer";
import Footer from "@/components/layout/footer/Footer";
import Search from "@/components/ui/search";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shyraq Market — всё, что тебе нужно",
    template: "%s | Shyraq Market",
  },
  description: "Онлайн-маркет Казахстана: покупки, доставка, лучшие цены.",
  keywords: [
    "Shyraq Market",
    "онлайн магазин",
    "электроника",
    "одежда",
    "доставка Казахстан",
  ],
  authors: [{ name: "Kazbek Assanbek" }],
  metadataBase: new URL("https://shyraq.kz"),
  openGraph: {
    title: "Shyraq Market",
    description: "Маркет, где всё под рукой 💡",
    url: "https://shyraq.kz",
    siteName: "Shyraq Market",
    locale: "ru_KZ",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50 text-gray-900`}
      >
        <HeaderServer />

        <main className="flex-1 w-full max-w-8xl mx-auto px-3 md:px-6 sm:px-9 lg:px-12 py-3">
          <Search />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
