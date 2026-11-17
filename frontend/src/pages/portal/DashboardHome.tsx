import { HeartIcon, MagnifyingGlassIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
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

      
        <Link
          to="/portal/adoptions" className="flex items-start gap-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-5 transition-shadow hover:shadow-md">
          <HeartIcon className="h-6 w-6 shrink-0 text-[var(--color-primary)]" />
          <div>
            <h3 className="font-semibold">My applications</h3>
            <p className="mt-1 text-sm text-[var(--color-text-default)]/60">
              View the status of your adoption applications.
            </p>
          </div>
        </Link>

        <Link
          to="/portal/releases/new" className="flex items-start gap-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-5 transition-shadow hover:shadow-md">
          <PaperAirplaneIcon className="h-6 w-6 shrink-0 text-[var(--color-primary)]" />
          <div>
            <h3 className="font-semibold">Surrender a pet</h3>
            <p className="mt-1 text-sm text-[var(--color-text-default)]/60">
              Give the pet a better life. Humanely.
            </p>
          </div>
        </Link>
      </div>

      {/* <div>
        <Link to="/portal/pets" className={buttonClasses("primary", "standard")}>
          Start browsing
        </Link>
      </div> */}
    </div>
  );
}
