"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border border-[#dde6e0] p-2 text-[#0f1a14] hover:bg-[#f4f8f5] dark:border-[#3d5248] dark:text-[#e8f0eb] dark:hover:bg-[#1a2a20]"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
