import { cn } from "@/lib/cn";

interface LogoProps {
  /** "light" = logo meant for light backgrounds (dark ink). "dark" = for dark backgrounds (light ink). */
  on?: "light" | "dark";
  className?: string;
}

/**
 * Brand logo. The SVGs live in /public and carry the "PET HEAVEN" wordmark
 * (Luckiest Guy) plus the teal paw mark.
 */
export function Logo({ on = "light", className }: LogoProps) {
  const src = on === "dark" ? "/logo on dark.svg" : "/logo on light.svg";
  return (
    <img
      src={src}
      alt="Pet Heaven Society"
      width={82}
      height={36}
      className={cn("h-9 w-auto", className)}
    />
  );
}
