/**
 * "Who we are" — a short intro blurb about the society.
 * Placeholder copy; swap for real content later.
 */
export function WhoWeAre() {
  return (
    <section id="who-we-are" className="content-max py-4">
      <h2 className="text-display text-center text-3xl text-[var(--color-primary)] sm:text-4xl">
        Who we are
      </h2>
      <div className="mt-6 flex flex-col items-center gap-6 md:flex-row md:items-start lg:gap-8">
        <p className="flex-1 text-lg text-[var(--color-text-default)]/80">
          Pet Heaven Society is a community-run shelter dedicated to rehoming rescued animals. We
          care for pets in need, match them with loving families, and support owners who can no
          longer keep their companions — all with compassion and zero judgement.
        </p>

        <div className="max-w-120 w-full flex-1 grow-0.2">
          <iframe
            className="aspect-video w-full rounded-lg"
            src="https://www.youtube.com/embed/Wn3A8DVahZI?si=nacMcnpW-oNuqHDw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
