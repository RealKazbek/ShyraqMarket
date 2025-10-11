import Link from "next/link";

interface HeaderProps {
  title: string;
  link?: string;
}

export default function ProductSectionHeader({ title, link }: HeaderProps) {
  return (
    <div
      className="
        flex flex-row items-center justify-between
        gap-2 sm:gap-0 mb-4 sm:mb-6 w-full
      "
    >
      <h2
        className="
          text-lg xs:text-xl sm:text-2xl md:text-3xl 
          font-semibold text-gray-900 
          leading-tight tracking-tight
        "
      >
        {title}
      </h2>

      {link && (
        <Link
          href={link}
          prefetch={false}
          className="
            text-sm sm:text-base font-medium text-emerald-600 
            hover:text-emerald-700 transition-colors
            w-fit sm:w-auto text-nowrap
          "
        >
          Смотреть все →
        </Link>
      )}
    </div>
  );
}
