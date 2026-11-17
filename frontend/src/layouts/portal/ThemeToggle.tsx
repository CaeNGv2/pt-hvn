import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

import { useTheme, type ThemeMode } from "@/hooks";

const icon: Record<ThemeMode, typeof SunIcon> = {
  auto: ComputerDesktopIcon,
  dark: MoonIcon,
  light: SunIcon,
};

const label: Record<ThemeMode, string> = {
  auto: "Theme: auto (system)",
  dark: "Theme: dark",
  light: "Theme: light",
};

/** Icon button that cycles theme mode: auto → dark → light. */
export function ThemeToggle() {
  const { mode, cycle } = useTheme();
  const Icon = icon[mode];

  return (
    <button
      type="button"
      onClick={cycle}
      title={label[mode]}
      aria-label={label[mode]}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[var(--color-text-default)]/70 hover:bg-[var(--color-container)] hover:text-[var(--color-text-default)]"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
