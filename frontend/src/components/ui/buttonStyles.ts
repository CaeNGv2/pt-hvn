import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "less";
export type ButtonSize = "sm" | "md" | "lg" | "bigger";

const base = cn(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-[var(--color-primary)] disabled:opacity-50",
  "disabled:pointer-events-none"
);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-text-light)] hover:opacity-90",
  secondary:
    "bg-[var(--color-container)] text-[var(--color-text-default)] hover:bg-[var(--color-container-highest)]",
  ghost:
    "bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-container)]",
  less: "border border-[var(--color-outline)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  // "btn-bigger" equivalent: roomy CTA with a sensible min-width.
  bigger: "px-7 py-3.5 text-lg min-w-35",
};

/**
 * Shared button class string, usable on <button>, <a>, or <Link> so CTAs that
 * navigate (routes / in-page anchors) look identical to action buttons.
 *
 * Usage:
 *   <Link to="/portal/login" className={buttonClasses("primary", "bigger")}>…</Link>
 */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
): string {
  return cn(base, variantClasses[variant], sizeClasses[size], className);
}
