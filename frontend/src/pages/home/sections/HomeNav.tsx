import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Logo } from "@/components/Logo";
import { buttonClasses } from "@/components/ui";

/** In-page section anchors. HashLink resolves these correctly under HashRouter. */
const sectionLinks = [
  { label: "Who we are", href: "/#who-we-are" },
  { label: "How to help", href: "/#how-to-help" },
  { label: "Our impact", href: "/#impact" },
  { label: "Stories", href: "/#stories" },
];


export function HomeNav() {
  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-30 bg-[var(--color-container)]/80 backdrop-blur-md"
    >
      {({ open }) => (
        <>
          <nav className="content-max flex items-center justify-between gap-4 py-3">
            {/* Left: hamburger on mobile, logo on desktop. */}
            <div className="flex flex-1 items-center md:flex-none">
              <DisclosureButton
                className="rounded-md p-1 text-[var(--color-text-default)] hover:text-[var(--color-primary)] md:hidden"
                aria-label="Toggle menu"
              >
                {open ? (
                  <XMarkIcon className="h-7 w-7" />
                ) : (
                  <Bars3Icon className="h-7 w-7" />
                )}
              </DisclosureButton>
              <Link
                to="/"
                aria-label="Pet Heaven home"
                className="hidden shrink-0 md:block"
              >
                <Logo onSurfaceType="light" />
              </Link>
            </div>

            {/* Center: logo on mobile, section links on desktop. */}
            <Link
              to="/"
              aria-label="Pet Heaven home"
              className="flex shrink-0 justify-center md:hidden"
            >
              <Logo onSurfaceType="light" />
            </Link>
            <ul className="hidden items-center gap-1 md:flex">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <HashLink
                    smooth
                    to={link.href}
                    className={buttonClasses(
                      "raw",
                      "standard",
                      "text-[var(--color-text-default)]/80 hover:text-[var(--color-primary)]"
                    )}
                  >
                    {link.label}
                  </HashLink>
                </li>
              ))}
            </ul>

            {/* Right: Adopt CTA (desktop) + user icon (always). */}
            <div className="flex flex-1 items-center justify-end gap-3 md:flex-none">
              <Link
                to="/portal"
                className={buttonClasses("primary", "standard", "max-md:hidden")}
              >
                Adopt Now
              </Link>
              <Link
                to="/portal/login"
                aria-label="Sign in to the portal"
                className="rounded-full p-1 text-[var(--color-text-default)] transition-colors hover:text-[var(--color-primary)]"
              >
                <UserCircleIcon className="h-8 w-8" />
              </Link>
            </div>
          </nav>

          {/* Mobile collapsible panel. */}
          <DisclosurePanel className="border-t border-[var(--color-outline)] md:hidden">
            <ul className="content-max flex flex-col gap-1 py-3">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <DisclosureButton
                    as={HashLink}
                    smooth
                    to={link.href}
                    className={buttonClasses(
                      "raw",
                      "standard",
                      "w-full justify-start text-[var(--color-text-default)]/80 hover:text-[var(--color-primary)]"
                    )}
                  >
                    {link.label}
                  </DisclosureButton>
                </li>
              ))}
              <li className="pt-2">
                <DisclosureButton
                  as={Link}
                  to="/portal"
                  className={buttonClasses("primary", "standard", "w-full")}
                >
                  Adopt
                </DisclosureButton>
              </li>
            </ul>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
