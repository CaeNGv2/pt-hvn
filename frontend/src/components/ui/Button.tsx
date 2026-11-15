import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-text-light)] hover:opacity-90",
  secondary:
    "bg-[var(--color-container)] text-[var(--color-text-default)] hover:bg-[var(--color-container-highest)]",
  ghost:
    "bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-container)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

/**
 * Sample reusable button. Styling is driven entirely by theme tokens, so it
 * adapts to the dashboard (light/dark) and the home (pink) themes automatically.
 *
 * Usage:
 *   <Button variant="primary" size="md" onClick={...}>Adopt me</Button>
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-[var(--color-primary)] disabled:opacity-50",
        "disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
