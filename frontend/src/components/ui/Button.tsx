import type { ButtonHTMLAttributes } from "react";

import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Reusable button. Styling is driven entirely by theme tokens, so it adapts to
 * the dashboard (light/dark) and the home (pink) themes automatically.
 *
 * For links that should look like buttons, use `buttonClasses(...)` directly on
 * an <a>/<Link> instead of this component.
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
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
