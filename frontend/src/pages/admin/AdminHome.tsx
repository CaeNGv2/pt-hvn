import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { usePortalHeader, type Breadcrumb } from "@/layouts";

const BREADCRUMBS: Breadcrumb[] = [{ label: "Admin" }];

/** Admin overview (placeholder widgets for later phases). */
export default function AdminHome() {
  usePortalHeader("Admin overview", BREADCRUMBS);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[var(--color-text-default)]/70">
        Manage pets, members, and review adoption and surrender requests. More
        tools arrive in later phases.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/demo-state"
          className="flex items-start gap-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-5 transition-shadow hover:shadow-md"
        >
          <ArrowPathIcon className="h-6 w-6 shrink-0 text-[var(--color-primary)]" />
          <div>
            <h3 className="font-semibold">Demo state</h3>
            <p className="mt-1 text-sm text-[var(--color-text-default)]/60">
              Reset the database back to seeded demo data.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
