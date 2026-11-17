import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

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

/**
 * Portal shell: a fixed sidebar + a content area whose sticky header shows the
 * current page title with a breadcrumb trail beneath it.
 *
 * `nav` lets different areas (member portal, admin) reuse this shell with their
 * own sidebar content. Pages declare their title/breadcrumbs via
 * `usePortalHeader(...)`.
 */
export default function PortalLayout({ nav = portalSidebarNav }: PortalLayoutProps) {
  const [header, setHeader] = useState<PortalHeader>(DEFAULT_HEADER);
  const ctx = useMemo(() => ({ header, setHeader }), [header]);

  return (
    <PortalHeaderContext value={ctx}>
      <div className="flex min-h-svh bg-[var(--color-surface-canvas)] text-[var(--color-text-default)]">
        <div className="sticky top-0 h-svh shrink-0">
          <PortalSidebar nav={nav} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Sticky header: page title + breadcrumb. */}
          <header className="sticky top-0 z-20 border-b border-[var(--color-outline)] bg-[var(--color-surface-canvas)]/90 px-6 py-3 backdrop-blur">
            <h1 className="text-lg font-semibold">{header.title}</h1>
            <div className="mt-1">
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
