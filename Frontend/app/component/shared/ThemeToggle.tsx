import { useTheme } from "../../context/ThemeContext";
import { IconButton } from "../ui/IconButton";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} icon={<span>{theme === "dark" ? "🌙" : "🌞"}</span>}/>
  );
}
