import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

type LangType = "en" | "ru" | "kz";

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const availableLang: { value: LangType; label: string }[] = [
    { value: "kz", label: "Қазақша" },
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" },
  ];

  const selectedLabel =
    availableLang.find((l) => l.value === (lang as LangType))?.label ||
    "English";

  return (
    <div className="relative w-30 cursor-pointer">
      <button
        className="rounded-xl cursor-pointer w-full py-[6px] px-[16px] bg-gray-900 hover:bg-gray-700 active:bg-gray-800 smooth body2 font-[500] text-gray-50"
        onClick={() => setOpen(!open)}
      >
        {selectedLabel}
      </button>
      {open && (
        <ul className="absolute w-full bg-gray-900 rounded-xl mt-1 z-10">
          {availableLang.map((item) => (
            <li
              key={item.value}
              className="rounded-xl text-center py-[6px] px-[16px] bg-gray-900 hover:bg-gray-700 active:bg-gray-800 smooth body2 font-[500] text-gray-50"
              onClick={() => {
                setLang(item.value);
                setOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
