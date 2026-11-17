import { Link } from "react-router-dom";

import { api, type AdoptionApplication } from "@/api";
import { StatusBadge } from "@/components/StatusBadge";
import { buttonClasses } from "@/components/ui";
import { useApi, useAuth } from "@/hooks";
import { usePortalHeader, type Breadcrumb } from "@/layouts";

const BREADCRUMBS: Breadcrumb[] = [
  { label: "Portal", to: "/portal" },
  { label: "Adoption" },
  { label: "My applications" },
];

export default function MyApplicationsPage() {
  usePortalHeader("My applications", BREADCRUMBS);
  const { isMemberAuthenticated } = useAuth();

  const { data, loading, error } = useApi<AdoptionApplication[]>(
    () => api.adoptions.adoptionsControllerFindMine(),
    []
  );

  if (!isMemberAuthenticated) {
    return <GuestPrompt />;
  }

  if (loading) return <ListSkeleton />;
  if (error) return <ErrorBox />;

  const apps = data ?? [];
  if (apps.length === 0) {
    return (
      <EmptyState
        message="You haven't applied to adopt any pets yet."
        ctaTo="/portal/pets"
        ctaLabel="Browse pets"
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {apps.map((app) => (
        <li
          key={app.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-4"
        >
          <div className="min-w-0">
            <p className="truncate font-medium">
              {app.pet?.name ?? "Pet"}
              {app.pet?.type?.name ? (
                <span className="text-[var(--color-text-default)]/50">
                  {" "}
                  · {app.pet.type.name}
                </span>
              ) : null}
            </p>
            <p className="text-xs text-[var(--color-text-default)]/50">
              Submitted {new Date(app.submittedAt).toLocaleDateString()}
            </p>
          </div>
          <StatusBadge status={app.status} />
        </li>
      ))}
    </ul>
  );
}

function GuestPrompt() {
  return (
    <div className="rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-8 text-center">
      <p className="text-[var(--color-text-default)]/70">
        Log in to view your adoption applications.
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

export function EmptyState({
  message,
  ctaTo,
  ctaLabel,
}: {
  message: string;
  ctaTo?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] p-8 text-center">
      <p className="text-[var(--color-text-default)]/60">{message}</p>
      {ctaTo && ctaLabel && (
        <Link
          to={ctaTo}
          className={buttonClasses("primary", "standard", "mt-4 inline-flex")}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="h-16 animate-pulse rounded-xl border border-[var(--color-outline)] bg-[var(--color-container)]"
        />
      ))}
    </div>
  );
}

export function ErrorBox() {
  return (
    <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
      Something went wrong. Please try again later.
    </p>
  );
}
