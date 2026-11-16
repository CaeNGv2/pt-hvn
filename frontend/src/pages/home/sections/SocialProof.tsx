import { StarIcon } from "@heroicons/react/24/solid";

interface Review {
  author: string;
  quote: string;
  rating: number;
}

const reviews: Review[] = [
  {
    author: "Amira Yusof",
    quote:
      "Adopting Mochi was the easiest, warmest experience. The team genuinely cared about the match, not just the paperwork.",
    rating: 5,
  },
  {
    author: "Daniel Lim",
    quote:
      "I had to surrender my cat after moving abroad. They handled it with zero judgement and kept me updated on her new home.",
    rating: 5,
  },
  {
    author: "Priya Nair",
    quote:
      "Volunteered for a weekend and ended up adopting a senior dog. Best decision ever — thank you Pet Heaven!",
    rating: 5,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-[var(--color-accent-1)]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={i < rating ? "h-5 w-5" : "h-5 w-5 opacity-25"}
        />
      ))}
    </div>
  );
}

/** "Stories" — social proof testimonial cards. */
export function SocialProof() {
  return (
    <section id="stories" className="content-max py-4">
      <div className="mb-9 text-center">
        <h2 className="text-display text-3xl text-[var(--color-primary)] sm:text-4xl">
          Happy tails
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-default)]/70">
          Real stories from adopters, volunteers, and the families we've helped.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <figure
            key={review.author}
            className="flex flex-col gap-4 rounded-[var(--home-radius)] border border-[var(--color-outline)] bg-[var(--color-surface)] p-6"
          >
            <Stars rating={review.rating} />
            <blockquote className="text-sm leading-relaxed text-[var(--color-text-default)]/80">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-2">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[var(--color-text-light)]"
                style={{ background: "var(--home-gradient-cool)" }}
                aria-hidden
              >
                {review.author.charAt(0)}
              </span>
              <span className="text-sm font-semibold">{review.author}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
