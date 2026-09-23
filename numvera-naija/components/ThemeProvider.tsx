"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nn-theme") as Theme | null;
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (preferDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setReady(true);
  }, []);

  function toggle() {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      localStorage.setItem("nn-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }

  if (!ready) return <>{children}</>;
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
