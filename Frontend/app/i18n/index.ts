import en from "./translations/en";
import ru from "./translations/ru";
import kz from "./translations/kz";

export const translations = {
  en,
  ru,
  kz,
};

export type Lang = keyof typeof translations;