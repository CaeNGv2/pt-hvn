import { PhotoIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import type { Pet } from "@/api";
import { cn } from "@/lib/cn";
import { resolvePhotoUrl } from "@/lib/photo";

/** Compact pet summary card; links to the pet detail page. */
export function PetCard({ pet }: { pet: Pet }) {
  const photo = resolvePhotoUrl(pet.photoRef);
  const metaBits = [
    pet.type?.name,
    pet.breed ?? undefined,
    pet.ageYears != null ? `${pet.ageYears} yr` : undefined,
  ].filter(Boolean);

  return (
    <Link
      to={`/portal/pets/${pet.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-[var(--color-container)]">
        {photo ? (
          <img
            src={photo}
            alt={pet.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--color-text-default)]/30">
            <PhotoIcon className="h-10 w-10" />
          </div>
        )}
        {!pet.isAvailable && (
          <span className="absolute top-2 left-2 rounded-full bg-[var(--color-text-default)]/70 px-2 py-0.5 text-xs font-medium text-[var(--color-surface)]">
            Adopted
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold">{pet.name}</h3>
          <span className="shrink-0 text-xs text-[var(--color-text-default)]/50 capitalize">
            {pet.gender}
          </span>
        </div>
        {metaBits.length > 0 && (
          <p className="truncate text-sm text-[var(--color-text-default)]/60">
            {metaBits.join(" · ")}
          </p>
        )}
        {pet.summaryDesc && (
          <p className="mt-1 line-clamp-2 text-sm text-[var(--color-text-default)]/70">
            {pet.summaryDesc}
          </p>
        )}
        {pet.tags?.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1 pt-2">
            {pet.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className={cn(
                  "rounded-full bg-[var(--color-container-highest)] px-2 py-0.5",
                  "text-xs text-[var(--color-text-default)]/70"
                )}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
