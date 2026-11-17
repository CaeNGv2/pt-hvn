// Re-exports the shared theme hook/types. The stateful provider lives in
// ThemeProvider.tsx so theme is a single source of truth across the app.
export {
  useTheme,
  type DashboardTheme,
  type ThemeMode,
  type ThemeContextValue,
} from "./theme-context";
