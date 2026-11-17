import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import type { Breadcrumb } from "./portal-header-context";

/** Breadcrumb trail shown under the sticky portal header. */
export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--color-text-default)]/60">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${crumb.label}-${i}`}>
              <li>
                {crumb.to && !isLast ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-[var(--color-primary)] hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "text-[var(--color-text-default)]" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 opacity-60" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
