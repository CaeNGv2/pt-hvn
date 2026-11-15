import { Button } from "@/components/ui";

/**
 * Public landing page (home SPA). Placeholder content — the real hero,
 * featured pets, and CTA sections come later.
 */
export default function LandingPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-[var(--color-primary)]">
        Find your new best friend 🐾
      </h1>
      <p className="mt-4 text-lg opacity-80">
        Placeholder landing copy. Adopt, support, or surrender a pet with Pet
        Heaven Society.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button variant="primary" size="lg">
          Browse pets
        </Button>
        <Button variant="secondary" size="lg">
          Become a member
        </Button>
      </div>
    </section>
  );
}
