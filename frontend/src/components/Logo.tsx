import { cn } from "@/lib/cn";

interface LogoProps {
  onSurfaceType?: "light" | "dark";
  className?: string;
}

const PAW_TEAL = "rgb(0, 178, 181)";

export function Logo({ onSurfaceType: on = "light", className }: LogoProps) {
  const ink = on === "dark" ? "rgb(250, 252, 254)" : "rgb(31, 31, 31)";
  return (
    <svg
      viewBox="0 0 82 36"
      width={82}
      height={36}
      fill="none"
      role="img"
      aria-label="Pet Heaven Society"
      className={cn("h-9 w-auto", className)}
    >
      <ellipse
        cx="30.731438561822074"
        cy="14.761309061385447"
        rx="4.385844245282044"
        ry="6.954384656358428"
        transform="matrix(0.906255, -0.422732, 0.396404, 0.918076, -2.970518, 14.200462)"
        fill={PAW_TEAL}
      />
      <ellipse
        cx="52.39152186570331"
        cy="14.723201710156758"
        rx="4.382345837246504"
        ry="6.9596501586338775"
        transform="matrix(0.917874, 0.396871, -0.371575, 0.928403, 9.773459, -19.738524)"
        fill={PAW_TEAL}
      />
      <ellipse
        cx="41.424932757240015"
        cy="8.99813722721143"
        rx="4.356608746281381"
        ry="6.99813722721143"
        fill={PAW_TEAL}
      />
      <text
        x="3.9999999999998863"
        y="35.69565391540527"
        dominantBaseline="ideographic"
        textLength="73.99565887451172"
        lengthAdjust="spacingAndGlyphs"
        fontFamily='"Luckiest Guy", system-ui, sans-serif'
        fontWeight={400}
        fontSize="14px"
        fill={ink}
        style={{ whiteSpace: "pre" }}
      >
        PET HEAVEN
      </text>
    </svg>
  );
}
