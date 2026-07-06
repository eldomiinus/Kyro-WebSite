import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import type { Theme } from "../hooks/useTheme";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";
  return (
    <motion.button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={!isDark}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      whileTap={{ scale: 0.92 }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
}
