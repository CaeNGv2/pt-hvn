import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Logo } from "@/components/Logo";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    heading: "Get involved",
    links: [
      { label: "Adopt a pet", href: "/portal" },
      { label: "Surrender a pet", href: "/portal" },
      { label: "Donate", href: "#" },
      { label: "Volunteer", href: "#" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our story", href: "/#who-we-are" },
      { label: "Our impact", href: "/#impact" },
      { label: "Stories", href: "/#stories" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact us", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
    ],
  },
  {
    heading: "Portal",
    links: [
      { label: "Portal", href: "/portal" },
      { label: "Staff Login", href: "/admin" }
    ],
  },
];

// Computed once at module load — avoids an impure call during render.
const currentYear = new Date().getFullYear();

/** Landing footer for the (fictitious) Pet Heaven Society. */
export function HomeFooter() {
  return (
    <footer className="mt-4 bg-[var(--color-container)]">
      <div className="content-max grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Logo onSurfaceType="light" />
          <p className="max-w-xs text-sm text-[var(--color-text-default)]/70">
            A community society rehoming rescued pets with love since
            2022.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--color-outline)] px-6 py-5 text-center text-xs text-[var(--color-text-default)]/60">
        © {currentYear} Pet Heaven Society. All rights reserved.
      </div>
    </footer>
  );
}

const footerLinkClass =
  "text-[var(--color-text-default)]/70 transition-colors hover:text-[var(--color-primary)]";

/** Routes footer hrefs to the right link type: in-page (#), route (/), or no-op. */
function FooterLink({ href, children }: { href: string; children: string }) {
  if (href.includes("#")) {
    return href === "#" ? (
      <a href={href} className={footerLinkClass}>
        {children}
      </a>
    ) : (
      <HashLink smooth to={href} className={footerLinkClass}>
        {children}
      </HashLink>
    );
  }
  return (
    <Link to={href} className={footerLinkClass}>
      {children}
    </Link>
  );
}
