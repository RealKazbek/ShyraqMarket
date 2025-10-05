import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { translations, type Lang } from "~/i18n";
import { saveToStorage, loadFromStorage } from "~/lib/utils/storage";

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & string];

type TranslationKeys = NestedKeyOf<(typeof translations)["en"]>;

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKeys) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = loadFromStorage<Lang>("lang", "en");
    setLang(stored);
    document.documentElement.setAttribute("lang", stored);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    saveToStorage("lang", l);
    document.documentElement.setAttribute("lang", l);
  };

  const t = (key: TranslationKeys): string => {
    const dict = translations[lang] ?? translations["en"];

    return key.split(".").reduce((acc: any, part: string) => {
      if (acc && typeof acc === "object" && part in acc) {
        return acc[part];
      }
      return key;
    }, dict) as string;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
