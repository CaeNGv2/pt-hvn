import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

import { buttonClasses } from "@/components/ui";
import { useAuth } from "@/hooks";
import { ThemeToggle } from "./ThemeToggle";
import { useMemberProfile } from "./useMemberProfile";

/**
 * Sidebar footer: profile name/info (or a guest state with a login button),
 * a logout action when signed in, and the theme toggle alongside.
 */
export function ProfileFooter() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { profile } = useMemberProfile();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const name = isAdmin
    ? "Administrator"
    : profile?.fullName ?? (isAuthenticated ? "Member" : "Guest");
  const subtitle = isAdmin
    ? "Admin access"
    : isAuthenticated
      ? profile?.email ?? "Signed in"
      : "Not signed in";

  return (
    <div className="border-t border-[var(--color-outline)] p-3">
      <div className="flex items-center gap-3">
        <UserCircleIcon className="h-9 w-9 shrink-0 text-[var(--color-text-default)]/50" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-[var(--color-text-default)]/60">
            {subtitle}
          </p>
        </div>
        <ThemeToggle />
      </div>

      {isAuthenticated ? (
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--color-text-default)]/70 hover:bg-[var(--color-container)] hover:text-[var(--color-text-default)]"
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          Log out
        </button>
      ) : (
        <Link
          to="/portal/login"
          className={buttonClasses("primary", "standard", "mt-3 w-full")}
        >
          Log in
        </Link>
      )}
    </div>
  );
}
