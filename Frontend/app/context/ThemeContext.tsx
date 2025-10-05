import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { saveToStorage, loadFromStorage } from "~/lib/utils/storage";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = loadFromStorage<Theme | null>("theme", null);

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme: Theme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(defaultTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    saveToStorage("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
