import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    // Screen
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    extend: {
      boxShadow: {
        DEFAULT: "0 2px 2px 0 rgba(0,0,0,0.06), 0 4px 3px 0 rgba(0,0,0,0.07)",
        md: "0 10px 8px 0 rgba(0,0,0,0.04), 0 4px 3px 0 rgba(0,0,0,0.1)",
        lg: "0 25px 25px 0 rgba(0, 0, 0, 0.15)",
      },

      colors: {
        gray: {
          DEFAULT: "var(--color-gray)",
          50: "var(--color-gray-50)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
          950: "var(--color-gray-950)",
        },
        emerald: {
          500: "var(--color-emerald-500)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
