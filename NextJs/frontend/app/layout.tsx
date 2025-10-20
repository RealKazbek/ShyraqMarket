import type { Metadata } from "next";
import "../styles/globals.css";

import HeaderServer from "@/components/layout/header/HeaderServer";
import Footer from "@/components/layout/footer/Footer";
import Search from "@/components/ui/search";

export const metadata: Metadata = {
  title: {
    default: "Shyraq Market — everything you need",
    template: "%s | Shyraq Market",
  },
  description:
    "Online marketplace in Kazakhstan: shopping, delivery, best prices.",
  keywords: [
    "Shyraq Market",
    "online store",
    "electronics",
    "clothing",
    "Kazakhstan delivery",
  ],
  authors: [{ name: "Kazbek Assanbek" }],
  metadataBase: new URL("https://shyraq.kz"),
  openGraph: {
    title: "Shyraq Market",
    description: "Marketplace where everything is within reach",
    url: "https://shyraq.kz",
    siteName: "Shyraq Market",
    locale: "ru_KZ",
    type: "website",
  },
};

// Root layout
export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen bg-gray-50 text-gray-900">
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
