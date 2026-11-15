/**
 * Tiny class-name joiner. Filters out falsy values so you can write:
 *   cn("btn", isActive && "btn-active", disabled && "opacity-50")
 *
 * Kept dependency-free on purpose. If class de-duplication/merging becomes a
 * pain, swap this for `clsx` + `tailwind-merge` without changing call sites.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
