import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { buttonClasses } from "@/components/ui";
import { usePortalHeader, type Breadcrumb } from "@/layouts";

const BREADCRUMBS: Breadcrumb[] = [{ label: "Portal" }];

/** Portal landing / overview. */
export default function DashboardHome() {
  usePortalHeader("Dashboard", BREADCRUMBS);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[var(--color-text-default)]/70">
        Welcome to the Pet Heaven portal. Browse pets up for adoption, track your
        applications, or surrender a pet you can no longer care for.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/portal/pets"
          className="flex items-start gap-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-5 transition-shadow hover:shadow-md"
        >
          <MagnifyingGlassIcon className="h-6 w-6 shrink-0 text-[var(--color-primary)]" />
          <div>
            <h3 className="font-semibold">Browse pets</h3>
            <p className="mt-1 text-sm text-[var(--color-text-default)]/60">
              See who's looking for a forever home.
            </p>
          </div>
        </Link>

        <div className="flex items-start gap-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-5 opacity-60">
          <HeartIcon className="h-6 w-6 shrink-0 text-[var(--color-primary)]" />
          <div>
            <h3 className="font-semibold">My applications</h3>
            <p className="mt-1 text-sm text-[var(--color-text-default)]/60">
              Coming soon.
            </p>
          </div>
        </div>
      </div>

      <div>
        <Link to="/portal/pets" className={buttonClasses("primary", "standard")}>
          Start browsing
        </Link>
      </div>
    </div>
  );
}
