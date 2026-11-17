import type { ButtonHTMLAttributes } from "react";

import {
  buttonClasses,
  type ButtonShape,
  type ButtonVariant,
} from "@/components/ui/buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shape?: ButtonShape;
}

/**
 * Reusable button. Styling is driven entirely by theme tokens, so it adapts to
 * the dashboard (light/dark) and the home (pink) themes automatically.
 *
 * For links that should look like buttons, use `buttonClasses(...)` directly on
 * an <a>/<Link> instead of this component.
 *
 * Usage:
 *   <Button variant="primary" shape="standard" onClick={...}>Save</Button>
 */
export function Button({
  variant = "primary",
  shape = "standard",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, shape, className)} {...props} />
  );
}
