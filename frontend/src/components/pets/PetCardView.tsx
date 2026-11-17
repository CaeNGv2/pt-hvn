import { PhotoIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/cn";

export interface PetCardViewData {
  name: string;
  typeName?: string | null;
  breed?: string | null;
  ageYears?: number | null;
  gender?: string | null;
  summaryDesc?: string | null;
  tags?: string[];
  /** Resolved image URL, or null for the placeholder. */
  photoUrl?: string | null;
  isAvailable?: boolean;
}

/** Presentational pet card (no routing). Used by PetCard and live previews. */
export function PetCardView({ data }: { data: PetCardViewData }) {
  const metaBits = [
    data.typeName,
    data.breed,
    data.ageYears != null ? `${data.ageYears} yr` : undefined,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-container)]">
        {data.photoUrl ? (
          <img
            src={data.photoUrl}
            alt={data.name || "Pet"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-default)]/30">
            <PhotoIcon className="h-10 w-10" />
          </div>
        )}
        {data.isAvailable === false && (
          <span className="absolute top-2 left-2 rounded-full bg-[var(--color-text-default)]/70 px-2 py-0.5 text-xs font-medium text-[var(--color-surface)]">
            Adopted
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold">
            {data.name || (
              <span className="text-[var(--color-text-default)]/40">Pet name</span>
            )}
          </h3>
          {data.gender && (
            <span className="shrink-0 text-xs text-[var(--color-text-default)]/50 capitalize">
              {data.gender}
            </span>
          )}
        </div>
        {metaBits.length > 0 && (
          <p className="truncate text-sm text-[var(--color-text-default)]/60">
            {metaBits.join(" · ")}
          </p>
        )}
        {data.summaryDesc && (
          <p className="mt-1 line-clamp-2 text-sm text-[var(--color-text-default)]/70">
            {data.summaryDesc}
          </p>
        )}
        {data.tags && data.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1 pt-2">
            {data.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full bg-[var(--color-container-highest)] px-2 py-0.5",
                  "text-xs text-[var(--color-text-default)]/70"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
