interface BannerProps {
  title: string;
  subtitle: string;
  color: string;
}

export default function BannerCard({ title, subtitle, color }: BannerProps) {
  return (
    <div
      className={`
        relative w-full h-[180px] xs:h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px]
        flex items-center justify-center 
        bg-gradient-to-r ${color}
        rounded-2xl overflow-hidden shadow-md
      `}
    >
      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-black/25 sm:bg-black/20 md:bg-black/15" />

      {/* Text */}
      <div
        className="
          relative z-10 text-center text-white 
          px-3 sm:px-6 md:px-10
          drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]
          max-w-[90%] sm:max-w-[80%]
        "
      >
        <h2
          className="
            text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl 
            font-bold mb-1 sm:mb-2 md:mb-3 
            leading-tight tracking-tight
          "
        >
          {title}
        </h2>
        <p
          className="
            text-xs xs:text-sm sm:text-base md:text-lg 
            opacity-90 leading-snug
          "
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
