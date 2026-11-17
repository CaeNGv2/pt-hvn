import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { useTheme } from "@/hooks";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Optional footer, e.g. a link to the other auth page. */
  footer?: ReactNode;
}

/** Centered card shell shared by the login/register pages. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  const { theme } = useTheme();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[var(--color-surface-canvas)] p-4 text-[var(--color-text-default)]">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Link to="/" aria-label="Pet Heaven home">
            <Logo onSurfaceType={theme} className="h-10" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-[var(--color-text-default)]/60">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-6 shadow-sm">
          {children}
        </div>

        {footer && (
          <div className="mt-4 text-center text-sm text-[var(--color-text-default)]/70">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/** Shared input styling for the auth forms. */
export const authInputClass =
  "w-full rounded-md border border-[var(--color-outline)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]";
