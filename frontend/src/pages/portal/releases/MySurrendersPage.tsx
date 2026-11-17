import { Link } from "react-router-dom";

import { api, type ReleasedPet } from "@/api";
import { StatusBadge } from "@/components/StatusBadge";
import { buttonClasses } from "@/components/ui";
import { useApi, useAuth } from "@/hooks";
import { usePortalHeader, type Breadcrumb } from "@/layouts";
import {
  EmptyState,
  ErrorBox,
  ListSkeleton,
} from "@/pages/portal/adoptions/MyApplicationsPage";

const BREADCRUMBS: Breadcrumb[] = [
  { label: "Portal", to: "/portal" },
  { label: "Release" },
  { label: "My surrenders" },
];

export default function MySurrendersPage() {
  usePortalHeader("My surrenders", BREADCRUMBS);
  const { isMemberAuthenticated } = useAuth();

  const { data, loading, error } = useApi<ReleasedPet[]>(
    () => api.releases.releasesControllerFindMine(),
    []
  );

  if (!isMemberAuthenticated) {
    return (
      <div className="rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-[var(--color-text-default)]/70">
          Log in to view your surrender requests.
        </p>
        <Link
          to="/portal/login"
          className={buttonClasses("primary", "standard", "mt-4 inline-flex")}
        >
          Log in
        </Link>
      </div>
    );
  }

  if (loading) return <ListSkeleton />;
  if (error) return <ErrorBox />;

  const releases = data ?? [];
  if (releases.length === 0) {
    return (
      <EmptyState
        message="You haven't submitted any surrender requests yet."
        ctaTo="/portal/releases/new"
        ctaLabel="Surrender a pet"
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {releases.map((r) => (
        <li
          key={r.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-4"
        >
          <div className="min-w-0">
            <p className="truncate font-medium">
              {r.petName}
              {r.petType?.name ? (
                <span className="text-[var(--color-text-default)]/50">
                  {" "}
                  · {r.petType.name}
                </span>
              ) : null}
            </p>
            <p className="text-xs text-[var(--color-text-default)]/50">
              Submitted {new Date(r.submittedAt).toLocaleDateString()}
            </p>
          </div>
          <StatusBadge status={r.status} />
        </li>
      ))}
    </ul>
  );
}
