import { cn } from "@/lib/cn";

/** Style/colour of the button. Mirrors the reference's btn-* classes. */
export type ButtonVariant = "primary" | "secondary" | "less" | "raw";

/**
 * Shape/size of the button (orthogonal to variant):
 * - "standard": compact, for in-UI controls (small radius, regular text).
 * - "bigger":   roomy landing CTA, min-height 48px, larger radius.
 */
export type ButtonShape = "standard" | "bigger";

const base = cn(
  "inline-flex items-center justify-center gap-2 text-center font-normal",
  "cursor-pointer transition-colors focus-visible:outline-2",
  "focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
  "disabled:opacity-50 disabled:pointer-events-none"
);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:brightness-90",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-text-inverse)] hover:brightness-90",
  // "btn-less": transparent with a thin outline (lower-emphasis action).
  less: "bg-transparent text-[var(--color-primary)] outline hover:bg-[var(--color-container-highest)]",
  // "btn-raw": transparent, inherits colour, subtle hover fill.
  raw: "bg-transparent text-inherit hover:bg-[var(--color-container-highest)]",
};

const shapeClasses: Record<ButtonShape, string> = {
  // compact control: small radius, tight padding.
  standard: "rounded-[3px] px-3.5 py-2 text-base",
  // landing CTA: taller hit area + rounder corners.
  bigger: "min-h-12 rounded-lg px-4 py-2 text-base",
};

/**
 * Shared button class string, usable on <button>, <a>, or <Link> so CTAs that
 * navigate (routes / in-page anchors) look identical to action buttons.

 * Usage:
 *   <Link to="/portal" className={buttonClasses("primary", "bigger")}>Adopt</Link>
 *   <a href="#who" className={buttonClasses("raw", "standard")}>Who we are</a>
 */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  shape: ButtonShape = "standard",
  className?: string
): string {
  return cn(base, variantClasses[variant], shapeClasses[shape], className);
}
