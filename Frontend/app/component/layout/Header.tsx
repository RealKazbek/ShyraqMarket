import React, { useState } from "react";
import { useLanguage } from "~/context/LanguageContext";
import Button from "../ui/Button";
import Link from "../ui/Link";
import ThemeToggle from "../shared/ThemeToggle";
import LanguageToggle from "../shared/LanguageToggle";
import { IconButton } from "../ui/IconButton";
import { useLocation } from "react-router";

function Header() {
  const { t } = useLanguage();

  type NavItem = { label: string; href: string };
  type NavConfig = Record<string, NavItem>;

  const menu = (t as any)("header.menu", {
    returnObjects: true,
  }) as NavConfig;

  type CvButton = { label: string; href: string };

  const registration = (t as any)("header.button.registration") as CvButton;

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 backdrop-blur-md bg-gray-100/50 border-b border-b-gray-300 z-50">
      <div className="container flex justify-between items-center py-4">
        <a href={location.pathname === "/" ? "#home" : "/"} target="_self">
          <h2>SHYRAQ MARKET</h2>
        </a>

        <div className="hidden xl:flex items-center gap-6">
          <nav className="flex items-center gap-6 px-6 border-r border-gray-300">
            {Object.values(menu).map((item) => (
              <Link
                variant="menu"
                key={item.href}
                href={location.pathname === "/" ? item.href : "/"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <Button href="/auth/login">{registration.label}</Button>
          </div>
        </div>

        <button
          className="xl:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-gray-300 bg-gray-100 shadow-sm hover:bg-gray-100 smooth"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-gray-800 transform transition duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-800 my-1 transition duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-800 transform transition duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="xl:hidden absolute bg-gray-100/95 top-full left-0 w-full border-b border-gray-300">
          <nav className="flex flex-col items-center gap-4 px-6 py-4">
            {Object.values(menu).map((item) => (
              <Link
                variant="menu"
                key={item.href}
                href={location.pathname === "/" ? item.href : "/"}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex justify-between items-center gap-4 mt-4">
              <LanguageToggle />
              <ThemeToggle />
              <Button href="/auth/login">{registration.label}</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
