import { PhotoIcon } from "@heroicons/react/24/outline";
import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { api, type Pet } from "@/api";
import { AdoptionForm } from "@/components/pets/AdoptionForm";
import { Button } from "@/components/ui";
import { useApi } from "@/hooks";
import { usePortalHeader, type Breadcrumb } from "@/layouts";
import { resolvePhotoUrl } from "@/lib/photo";

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const petId = Number(id);

  const { data: pet, loading, error } = useApi<Pet>(
    () => api.pets.petsControllerFindOne(petId),
    [petId]
  );

  // Breadcrumb trail: shows the pet name once loaded.
  const breadcrumbs = useMemo<Breadcrumb[]>(
    () => [
      { label: "Portal", to: "/portal" },
      { label: "Adoption", to: "/portal/pets" },
      { label: pet ? pet.name : "View pet" },
    ],
    [pet]
  );
  usePortalHeader(pet ? pet.name : "View pet", breadcrumbs);

  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  function openForm() {
    setShowForm(true);
    // Scroll the form into view after it renders.
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    );
  }

  if (loading) return <DetailSkeleton />;

  if (error || !pet) {
    return (
      <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
        Couldn't load this pet. It may have been removed.
      </p>
    );
  }

  const photo = resolvePhotoUrl(pet.photoRef);
  const meta = [
    pet.type?.name,
    pet.breed ?? undefined,
    pet.ageYears != null ? `${pet.ageYears} years` : undefined,
    pet.gender !== "unknown" ? pet.gender : undefined,
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Photo */}
        <div className="overflow-hidden rounded-xl border border-[var(--color-outline)] bg-[var(--color-container)]">
          <div className="aspect-[4/3]">
            {photo ? (
              <img src={photo} alt={pet.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[var(--color-text-default)]/30">
                <PhotoIcon className="h-12 w-12" />
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">{pet.name}</h2>
              <span
                className={
                  pet.isAvailable
                    ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                    : "rounded-full bg-[var(--color-container-highest)] px-2 py-0.5 text-xs font-medium text-[var(--color-text-default)]/60"
                }
              >
                {pet.isAvailable ? "Available" : "Adopted"}
              </span>
            </div>
            {meta.length > 0 && (
              <p className="mt-1 text-[var(--color-text-default)]/60 capitalize">
                {meta.join(" · ")}
              </p>
            )}
          </div>

          {pet.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {pet.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-[var(--color-container-highest)] px-2.5 py-1 text-xs text-[var(--color-text-default)]/70"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {(pet.summaryDesc || pet.fullDesc) && (
            <div className="space-y-2 text-sm leading-relaxed text-[var(--color-text-default)]/80">
              {pet.summaryDesc && <p className="font-medium">{pet.summaryDesc}</p>}
              {pet.fullDesc && <p>{pet.fullDesc}</p>}
            </div>
          )}

          {pet.isAvailable && !showForm && (
            <div className="mt-2">
              <Button onClick={openForm}>Adopt {pet.name}</Button>
            </div>
          )}
          {!pet.isAvailable && (
            <p className="text-sm text-[var(--color-text-default)]/60">
              {pet.name} has already found a home.
            </p>
          )}
        </div>
      </div>

      {/* Expandable adoption form */}
      {showForm && (
        <div ref={formRef}>
          <AdoptionForm
            petId={pet.id}
            petName={pet.name}
            onSubmitted={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="aspect-[4/3] animate-pulse rounded-xl bg-[var(--color-container)]" />
      <div className="space-y-3">
        <div className="h-7 w-1/2 animate-pulse rounded bg-[var(--color-container)]" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-[var(--color-container)]" />
        <div className="h-20 w-full animate-pulse rounded bg-[var(--color-container)]" />
      </div>
    </div>
  );
}
