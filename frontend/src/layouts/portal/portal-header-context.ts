import { createContext, useContext } from "react";

export interface Breadcrumb {
  label: string;
  /** Omit on the last (current) crumb. */
  to?: string;
}

export interface PortalHeader {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export interface PortalHeaderContextValue {
  header: PortalHeader;
  setHeader: (header: PortalHeader) => void;
}

export const PortalHeaderContext = createContext<PortalHeaderContextValue | null>(
  null
);

/**
 * Read the header context (used by the layout to render the sticky title +
 * breadcrumb). Prefer the `usePortalHeader` setter hook inside pages.
 */
export function usePortalHeaderContext(): PortalHeaderContextValue {
  const ctx = useContext(PortalHeaderContext);
  if (!ctx) {
    throw new Error("Portal header context used outside <PortalLayout>.");
  }
  return ctx;
}
