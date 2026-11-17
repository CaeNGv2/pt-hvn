import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { useTheme } from "@/hooks";
import { cn } from "@/lib/cn";
import type { SidebarNav } from "./portalNav";
import { ProfileFooter } from "./ProfileFooter";

const linkBase = "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors";

interface PortalSidebarProps {
  /** Navigation config for this area (member portal, admin, …). */
  nav: SidebarNav;
}

/**
 * Full-height sidebar: logo, the area's dashboard link + "Society home page",
 * a scrollable categorised nav, and the profile/theme footer.
 *
 * Navigation content comes from `nav`, so the member portal and admin render
 * different items from the same component.
 */
export function PortalSidebar({ nav }: PortalSidebarProps) {
  // Shared theme context — the logo ink reacts when the theme cycles.
  const { theme } = useTheme();
  const { dashboardLink, categories } = nav;

  return (
    <aside className="flex h-svh w-64 flex-col border-r border-[var(--color-outline)] bg-[var(--color-surface)]">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center px-4">
        <Link to={dashboardLink.to} aria-label="Pet Heaven portal">
          <Logo onSurfaceType={theme === "dark" ? "dark" : "light"} />
        </Link>
      </div>

      {/* Fixed top links */}
      <div className="flex flex-col gap-1 px-3 pb-2">
        <NavLink
          to={dashboardLink.to}
          end
          className={({ isActive }) =>
            cn(
              linkBase,
              isActive
                ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                : "text-[var(--color-text-default)]/80 hover:bg-[var(--color-container)]"
            )
          }
        >
          <dashboardLink.icon className="h-5 w-5 shrink-0" />
          {dashboardLink.label}
        </NavLink>
        <Link
          to="/"
          className={cn(
            linkBase,
            "text-[var(--color-text-default)]/80 hover:bg-[var(--color-container)]"
          )}
        >
          <ArrowLeftIcon className="h-5 w-5 shrink-0" />
          Society home page
        </Link>

        {categories
          .filter((category) => category.heading === "main")
          .map((category) => (
            <>
              {category.items.map((item) => (
                <li key={item.to}>
                  {item.disabled ? (
                    <span
                      className={cn(
                        linkBase,
                        "cursor-not-allowed text-[var(--color-text-default)]/35"
                      )}
                      title="Coming soon"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.label}
                    </span>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          linkBase,
                          isActive
                            ? "bg-[var(--color-container-highest)] font-medium text-[var(--color-primary)]"
                            : "text-[var(--color-text-default)]/80 hover:bg-[var(--color-container)]"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </>
          ))}
      </div>

      {/* Scrollable categorised items */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {categories
          .filter((category) => category.heading !== "main")
          .map((category) => (
            <div key={category.heading} className="mb-4">
              <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-[var(--color-text-default)]/40 uppercase">
                {category.heading}
              </p>
              <ul className="flex flex-col gap-0.5">
                {category.items.map((item) => (
                  <li key={item.to}>
                    {item.disabled ? (
                      <span
                        className={cn(
                          linkBase,
                          "cursor-not-allowed text-[var(--color-text-default)]/35"
                        )}
                        title="Coming soon"
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.label}
                      </span>
                    ) : (
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            linkBase,
                            isActive
                              ? "bg-[var(--color-container-highest)] font-medium text-[var(--color-primary)]"
                              : "text-[var(--color-text-default)]/80 hover:bg-[var(--color-container)]"
                          )
                        }
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </nav>

      {/* Profile + theme toggle */}
      <ProfileFooter scope={nav.scope} />
    </aside>
  );
}
