import type { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";

import { useTheme } from "@/hooks";

export interface DashboardNavItem {
  label: string;
  to: string;
}

interface DashboardLayoutProps {
  /** Shown in the sidebar header, e.g. "Member" or "Admin". */
  title?: string;
  /** Sidebar navigation links. */
  nav?: DashboardNavItem[];
  /** Optional extra content in the top bar (e.g. user menu). */
  actions?: ReactNode;
}

export default function PortalLayout({
  title = "Dashboard",
  nav = [],
  actions,
}: DashboardLayoutProps) {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-svh grid grid-cols-[240px_1fr] bg-[var(--color-surface-canvas)] text-[var(--color-text-default)]">
      <aside className="flex flex-col gap-2 border-r border-[var(--color-outline)] bg-[var(--color-surface)] p-4">
        <div className="mb-4 text-lg font-semibold">{title}</div>
        <nav className="flex flex-col gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 hover:bg-[var(--color-container)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b border-[var(--color-outline)] px-6 py-3">
          <span className="text-sm opacity-70">Pet Heaven Society</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="rounded-md px-2 py-1 text-sm hover:bg-[var(--color-container)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            {actions}
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Child routes render here. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
