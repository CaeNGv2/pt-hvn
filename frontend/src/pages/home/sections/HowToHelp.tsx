import { HandRaisedIcon, HeartIcon, HomeModernIcon } from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";

interface HelpCard {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  cta: string;
  to: string;
}

const cards: HelpCard[] = [
  {
    icon: HeartIcon,
    title: "Adopt",
    desc: "Browse pets looking for a forever home and start an adoption application.",
    cta: "Find a pet",
    to: "/portal",
  },
  {
    icon: HomeModernIcon,
    title: "Release",
    desc: "Can no longer care for your pet? Submit a surrender request and we'll help.",
    cta: "Surrender a pet",
    to: "/portal",
  },
  {
    icon: HandRaisedIcon,
    title: "Donate",
    desc: "Fund food, shelter, and medical care for animals awaiting their new family.",
    cta: "Give support",
    to: "#",
  },
];

/** "How you can help" — three ways to get involved. */
export function HowToHelp() {
  return (
    <section id="how-to-help" className="content-max py-4">
      <div className="mb-9 text-center">
        <h2 className="text-display text-3xl text-[var(--color-primary)] sm:text-4xl">
          How you can help
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-default)]/70">
          Whether you open your home or your wallet, every bit makes a tail wag.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ icon: Icon, title, desc, cta, to }) => (
          <article
            key={title}
            className="flex flex-col items-start gap-4 rounded-[var(--home-radius)] border border-[var(--color-outline)] bg-[var(--color-surface)] p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--home-shadow-pop)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="text-display text-xl">{title}</h3>
            <p className="text-sm text-[var(--color-text-default)]/70">{desc}</p>
            <Link
              to={to}
              className="mt-auto pt-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              {cta} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
