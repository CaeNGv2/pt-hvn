import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  ThemeContext,
  type DashboardTheme,
  type ThemeContextValue,
  type ThemeMode,
} from "./theme-context";

const STORAGE_KEY = "pethvn.site.theme";
const MODE_CYCLE: ThemeMode[] = ["auto", "dark", "light"];

function prefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function resolve(mode: ThemeMode): DashboardTheme {
  if (mode === "auto") return prefersDark() ? "dark" : "light";
  return mode;
}

function readStoredMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "dark" || stored === "light" || stored === "auto"
    ? stored
    : "auto";
}

/**
 * Single source of truth for the theme (mode: auto → dark → light).
 *
 * - `mode` is the user's choice (persisted).
 * - `theme` is the resolved palette written to `data-theme` on <html>, which
 *   drives the token files in src/styles.
 * - In "auto" it follows the OS and live-updates when the preference flips.
 *
 * Wrap the app once; all `useTheme()` consumers share this state and re-render
 * together.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode());
  const [theme, setTheme] = useState<DashboardTheme>(() =>
    resolve(readStoredMode())
  );

  // Apply resolved theme + persist mode whenever the mode changes.
  useEffect(() => {
    const resolved = resolve(mode);
    setTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  // While in "auto", react to OS preference changes.
  useEffect(() => {
    if (mode !== "auto") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved: DashboardTheme = mql.matches ? "dark" : "light";
      setTheme(resolved);
      document.documentElement.setAttribute("data-theme", resolved);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [mode]);

  const cycle = useCallback(() => {
    setMode((m) => MODE_CYCLE[(MODE_CYCLE.indexOf(m) + 1) % MODE_CYCLE.length]);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, theme, setMode, cycle }),
    [mode, theme, cycle]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
