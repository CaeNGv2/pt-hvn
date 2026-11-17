import { useState } from "react";
import { Link } from "react-router-dom";

import {
  api,
  ReleasesControllerFindAllParamsStatusEnum as Status,
  type ReleasedPet,
} from "@/api";
import { StatusBadge } from "@/components/StatusBadge";
import { useApi } from "@/hooks";
import { usePortalHeader, type Breadcrumb } from "@/layouts";
import { cn } from "@/lib/cn";

const BREADCRUMBS: Breadcrumb[] = [
  { label: "Admin", to: "/admin" },
  { label: "Surrenders" },
];

const FILTERS: { value: Status | "all"; label: string }[] = [
  { value: Status.Pending, label: "Pending" },
  { value: Status.Accepted, label: "Accepted" },
  { value: Status.Rejected, label: "Rejected" },
  { value: "all", label: "All" },
];

export default function AdminReleasesPage() {
  usePortalHeader("Surrender requests", BREADCRUMBS);
  const [filter, setFilter] = useState<Status | "all">(Status.Pending);

  const { data, loading, error } = useApi<ReleasedPet[]>(
    () =>
      api.releases.releasesControllerFindAll(
        filter === "all" ? {} : { status: filter }
      ),
    [filter]
  );

  const releases = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm",
              filter === f.value
                ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                : "text-[var(--color-text-default)]/70 hover:bg-[var(--color-container)]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl border border-[var(--color-outline)] bg-[var(--color-container)]"
            />
          ))}
        </div>
      )}

      {!!error && !loading && (
        <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Couldn't load surrender requests.
        </p>
      )}

      {!loading && !error && releases.length === 0 && (
        <p className="rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-8 text-center text-sm text-[var(--color-text-default)]/60">
          No surrender requests{filter !== "all" ? ` with status "${filter}"` : ""}.
        </p>
      )}

      {!loading && releases.length > 0 && (
        <ul className="flex flex-col gap-3">
          {releases.map((r) => (
            <li key={r.id}>
              <Link
                to={`/admin/releases/${r.id}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-4 transition-shadow hover:shadow-md"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {r.petName}{" "}
                    <span className="text-[var(--color-text-default)]/50">
                      from {r.member?.fullName ?? "Member"}
                    </span>
                  </p>
                  <p className="text-xs text-[var(--color-text-default)]/50">
                    Submitted {new Date(r.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
