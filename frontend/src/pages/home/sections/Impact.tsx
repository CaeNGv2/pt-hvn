interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "130", label: "Pets adopted" },
  { value: "30", label: "Looking for a new home" },
  { value: "200", label: "Lives saved" },
];

/** "Our impact" — headline numbers on a bold gradient band. */
export function Impact() {
  return (
    <section id="impact" className="content-max py-4">
      <div
        className="rounded-lg px-6 py-12 text-center text-[var(--color-text-light)]"
        style={{ background: "var(--home-gradient)" }}
      >
        <h2 className="text-display text-3xl sm:text-4xl">Our impact</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">
          Numbers that keep us going and growing. You can be a part of it today.
        </p>

        <dl className="mt-8 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dt className="text-display text-5xl sm:text-6xl">{stat.value}</dt>
              <dd className="mt-2 text-sm font-medium tracking-wide uppercase">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
