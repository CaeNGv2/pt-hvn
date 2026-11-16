/**
 * "Who we are" — a short intro blurb about the society.
 * Placeholder copy; swap for real content later.
 */
export function WhoWeAre() {
  return (
    <section id="who-we-are" className="content-max py-4 text-center">
      <h2 className="text-display text-3xl text-[var(--color-primary)] sm:text-4xl">
        Who we are
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-default)]/80">
        Pet Heaven Society is a community-run shelter dedicated to rehoming
        rescued animals. We care for pets in need, match them with loving
        families, and support owners who can no longer keep their companions —
        all with compassion and zero judgement.
      </p>
    </section>
  );
}
