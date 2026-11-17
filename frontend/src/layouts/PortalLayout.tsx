import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Breadcrumbs } from "./portal/Breadcrumbs";
import {
  PortalHeaderContext,
  type PortalHeader,
} from "./portal/portal-header-context";
import { PortalSidebar } from "./portal/PortalSidebar";
import { portalSidebarNav, type SidebarNav } from "./portal/portalNav";

const DEFAULT_HEADER: PortalHeader = {
  title: "Dashboard",
  breadcrumbs: [{ label: "Portal" }],
};

interface PortalLayoutProps {
  /** Sidebar navigation for this area. Defaults to the member portal nav. */
  nav?: SidebarNav;
}

// The sidebar is static on md+ and collapses into a hamburger-triggered overlay
// drawer below md
export default function PortalLayout({ nav = portalSidebarNav }: PortalLayoutProps) {
  const [header, setHeader] = useState<PortalHeader>(DEFAULT_HEADER);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ctx = useMemo(() => ({ header, setHeader }), [header]);
  const location = useLocation();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <PortalHeaderContext value={ctx}>
      <div className="flex min-h-svh bg-[var(--color-surface-canvas)] text-[var(--color-text-default)]">
        {/* Desktop sidebar */}
        <div className="sticky top-0 hidden h-svh shrink-0 md:block">
          <PortalSidebar nav={nav} />
        </div>

        {/* Mobile drawer + backdrop */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <div className="absolute inset-y-0 left-0 shadow-xl">
              <PortalSidebar nav={nav} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Sticky header: hamburger (mobile) + page title + breadcrumb. */}
          <header className="sticky top-0 z-20 border-b border-[var(--color-outline)] bg-[var(--color-surface-canvas)]/90 px-6 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="-ml-1 rounded-md p-1 text-[var(--color-text-default)] hover:bg-[var(--color-container)] md:hidden"
              >
                {mobileOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
              <h1 className="text-display text-xl font-semibold">{header.title}</h1>
            </div>
            <div className="mt-2">
              <Breadcrumbs items={header.breadcrumbs} />
            </div>
          </header>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </PortalHeaderContext>
  );
}
