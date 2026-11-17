import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

import { buttonClasses } from "@/components/ui";
import { useAuth } from "@/hooks";
import { ThemeToggle } from "./ThemeToggle";
import { useMemberProfile } from "./useMemberProfile";

interface ProfileFooterProps {
  /** Which session this sidebar represents. */
  scope: "member" | "admin";
}

/**
 * Sidebar footer: profile info for the given scope, a scope-specific logout /
 * login action, and the theme toggle. Member and admin sessions are separate.
 */
export function ProfileFooter({ scope }: ProfileFooterProps) {
  const {
    isMemberAuthenticated,
    logoutMember,
    isAdmin,
    logoutAdmin,
  } = useAuth();
  const { profile } = useMemberProfile();
  const navigate = useNavigate();

  const isAdminScope = scope === "admin";
  const authed = isAdminScope ? isAdmin : isMemberAuthenticated;

  function handleLogout() {
    if (isAdminScope) {
      logoutAdmin();
      navigate("/admin/login");
    } else {
      logoutMember();
      navigate("/");
    }
  }

  const name = isAdminScope
    ? "Administrator"
    : profile?.fullName ?? (authed ? "Member" : "Guest");
  const subtitle = isAdminScope
    ? "Admin access"
    : authed
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

      {authed ? (
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
          to={isAdminScope ? "/admin/login" : "/portal/login"}
          className={buttonClasses("primary", "standard", "mt-3 w-full")}
        >
          Log in
        </Link>
      )}
    </div>
  );
}
