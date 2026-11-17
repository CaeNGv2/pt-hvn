import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

import { api, PetsControllerFindAllParamsAvailableEnum, type Pet } from "@/api";
import { PetCard } from "@/components/pets/PetCard";
import { useApi } from "@/hooks";
import { usePortalHeader, type Breadcrumb } from "@/layouts";

const BREADCRUMBS: Breadcrumb[] = [
  { label: "Portal", to: "/portal" },
  { label: "Adoption" },
  { label: "Browse pets" },
];

/** Lists pets available for adoption, with a client-side name filter. */
export default function PetListPage() {
  usePortalHeader("Browse pets", BREADCRUMBS);

  const [query, setQuery] = useState("");
  const { data, loading, error } = useApi<Pet[]>(
    () =>
      api.pets.petsControllerFindAll({
        available: PetsControllerFindAllParamsAvailableEnum.True,
      }),
    []
  );

  const pets = useMemo(() => {
    const list = data ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.breed ?? "").toLowerCase().includes(q) ||
        (p.type?.name ?? "").toLowerCase().includes(q)
    );
  }, [data, query]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--color-text-default)]/60">
          Meet the pets looking for a forever home.
        </p>
        <label className="relative w-full sm:w-72">
          <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[var(--color-text-default)]/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, breed, type…"
            className="w-full rounded-lg border border-[var(--color-outline)] bg-[var(--color-surface)] py-2 pr-3 pl-10 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </label>
      </div>

      {loading && <PetGridSkeleton />}

      {!!error && !loading && (
        <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Couldn't load pets. Please try again later.
        </p>
      )}

      {!loading && !error && pets.length === 0 && (
        <p className="rounded-lg border border-[var(--color-outline)] bg-[var(--color-surface)] p-8 text-center text-sm text-[var(--color-text-default)]/60">
          No pets match your search right now.
        </p>
      )}

      {!loading && pets.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}

function PetGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)]"
        >
          <div className="aspect-[4/3] animate-pulse bg-[var(--color-container)]" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--color-container)]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--color-container)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
