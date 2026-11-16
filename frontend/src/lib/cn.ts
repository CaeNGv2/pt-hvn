/**
 * simple class-name joiner. Filters out falsy values so you can write:
 *   cn("btn", isActive && "btn-active", disabled && "opacity-50")
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
