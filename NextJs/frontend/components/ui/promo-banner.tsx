"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BannerCard from "./banner-card";

const banners = [
  {
    id: 1,
    title: "Качественные локальные бренды",
    subtitle: "Поддержи производителей Казахстана",
    color: "from-emerald-600 to-lime-500",
  },
  {
    id: 2,
    title: "Скидки до 80%",
    subtitle: "Не пропусти горячие предложения недели",
    color: "from-pink-600 to-purple-600",
  },
  {
    id: 3,
    title: "Новые коллекции",
    subtitle: "Обновления каждую неделю",
    color: "from-blue-600 to-cyan-500",
  },
];

export default function PromoBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // ⏱️ плавнее каждые 5 секунд
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section
      className="
        relative w-full 
        h-[180px] xs:h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] 
        overflow-hidden rounded-2xl shadow-md mt-3
      "
    >
      {/* Слайды */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <BannerCard {...banner} />
        </div>
      ))}

      {/* Кнопки переключения */}
      <button
        onClick={handlePrev}
        className="
          hidden md:flex absolute left-2 sm:left-4 md:left-6 cursor-pointer
          top-1/2 -translate-y-1/2 
          p-1.5 sm:p-2.5 md:p-3 
          rounded-full bg-black/30 hover:bg-black/50 
          transition z-20 text-white backdrop-blur-sm
        "
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="
          hidden md:flex absolute right-2 sm:right-4 md:right-6 cursor-pointer
          top-1/2 -translate-y-1/2 
          p-1.5 sm:p-2.5 md:p-3 
          rounded-full bg-black/30 hover:bg-black/50 
          transition z-20 text-white backdrop-blur-sm
        "
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      {/* Индикаторы */}
      <div
        className="
          absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 
          flex gap-1.5 sm:gap-2 md:gap-3 z-20
        "
      >
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              h-1.5 sm:h-2 rounded-full transition-all duration-300
              ${
                i === activeIndex
                  ? "bg-white w-3 sm:w-4 md:w-6"
                  : "bg-white/50 w-1.5 sm:w-2 md:w-3"
              }
            `}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
