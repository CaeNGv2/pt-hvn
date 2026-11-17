import { useEffect } from "react";

import {
  usePortalHeaderContext,
  type Breadcrumb,
} from "./portal-header-context";

/**
 * Declare the portal page's title + breadcrumb trail from within a page.
 * The layout renders them in the sticky header.
 *
 * Usage:
 *   usePortalHeader("View pet", [
 *     { label: "Portal", to: "/portal" },
 *     { label: "Adoption", to: "/portal/pets" },
 *     { label: "View pet" },
 *   ]);
 *
 * Pass a stable `breadcrumbs` array (define outside render or memoise) if the
 * trail is dynamic, to avoid redundant updates.
 */
export function usePortalHeader(title: string, breadcrumbs: Breadcrumb[]) {
  const { setHeader } = usePortalHeaderContext();
  const key = JSON.stringify(breadcrumbs);

  useEffect(() => {
    setHeader({ title, breadcrumbs });
    // key captures breadcrumb content; title is primitive.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, key, setHeader]);
}
