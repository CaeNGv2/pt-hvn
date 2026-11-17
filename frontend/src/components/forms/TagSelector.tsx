import { api, type Tag } from "@/api";
import { useApi } from "@/hooks";
import { cn } from "@/lib/cn";

interface TagSelectorProps {
  /** Selected tag ids. */
  value: number[];
  onChange: (next: number[]) => void;
}

/** Toggle chips for the shelter's tag vocabulary (GET /pets/tags). */
export function TagSelector({ value, onChange }: TagSelectorProps) {
  const { data, loading } = useApi<Tag[]>(
    () => api.pets.petsControllerFindAllTags(),
    []
  );

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="h-7 w-20 animate-pulse rounded-full bg-[var(--color-container)]"
          />
        ))}
      </div>
    );
  }

  const tags = data ?? [];
  const selected = new Set(value);

  function toggle(id: number) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange([...next]);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const active = selected.has(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggle(tag.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              active
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                : "border-[var(--color-outline)] text-[var(--color-text-default)]/70 hover:border-[var(--color-primary)]"
            )}
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}
