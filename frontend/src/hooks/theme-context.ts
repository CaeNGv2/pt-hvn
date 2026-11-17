import { createContext, useContext } from "react";

/** Resolved palette actually applied to the DOM. */
export type DashboardTheme = "light" | "dark";
/** User-selectable mode. "auto" follows the OS preference. */
export type ThemeMode = "auto" | "light" | "dark";

export interface ThemeContextValue {
  /** What the user picked (persisted). */
  mode: ThemeMode;
  /** Resolved palette written to `data-theme` on <html>. */
  theme: DashboardTheme;
  setMode: (mode: ThemeMode) => void;
  /** Advance the mode: auto → dark → light → auto. */
  cycle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Shared theme state. Every consumer re-renders together when the theme
 * changes, so (e.g.) the sidebar logo and the toggle stay in sync.
 *
 * Usage:
 *   const { mode, theme, cycle } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}
