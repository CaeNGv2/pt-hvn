import { useCallback, useEffect, useState } from "react";

export type DashboardTheme = "light" | "dark";

const STORAGE_KEY = "site.theme";

/**
 * Dashboard light/dark theme toggle. Writes `data-theme` on <html> so the
 * token files in src/styles pick the right palette.
 *
 * Note: the home layout uses its own fixed `data-theme="home"` and does not
 * use this hook.
 *
 * Usage:
 *   const { theme, toggle } = useTheme();
 *   <button onClick={toggle}>{theme === "dark" ? "☀️" : "🌙"}</button>
 */
export function useTheme() {
  const [theme, setTheme] = useState<DashboardTheme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggle };
}
