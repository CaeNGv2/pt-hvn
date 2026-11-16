import { Link } from "react-router-dom";

import dogImg from "@/assets/dog_newsletter.webp";
import { buttonClasses } from "@/components/ui";


// Stacking is kept within this section's own context using non-negative

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden text-[var(--color-text-light)]">
      {/* Slanted split backdrop (two dark tones divided on a diagonal). */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "var(--home-hero-dark)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background: "var(--home-hero-dark-2)",
          clipPath: "polygon(0 0, 62% 0, 38% 100%, 0% 100%)",
        }}
      />

      {/* Floating dog: bottom-aligned, right-aligned, above the backdrop but
          below the content. Width scales with the viewport for mobile. */}
      <img
        src={dogImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 z-10 w-[min(42%,22rem)] object-contain object-bottom opacity-90 select-none"
      />

      {/* Content — constrained to the shared 1280px column. */}
      <div className="content-max relative z-20 py-16 sm:py-20 lg:py-24">
        <div className="flex max-w-xl flex-col items-start gap-5">
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl">
            Give a paw,
            <br />
            find a friend
          </h1>
          <p className="max-w-md text-base text-white/85">
            Adopt a loving companion or find a safe new home for a pet you can no
            longer keep. Pet Heaven Society is here for both.
          </p>
          <div className="mt-2 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Link
              to="/portal"
              className={buttonClasses("primary", "bigger", "w-full sm:w-auto")}
            >
              Adopt or release
            </Link>
            <a
              href="#how-to-help"
              className={buttonClasses(
                "less",
                "bigger",
                "w-full text-[var(--color-text-light)] hover:bg-white/15 sm:w-auto"
              )}
            >
              How you can help
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
