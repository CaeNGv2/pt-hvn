import { Link, Outlet } from "react-router-dom";

/**
 * Public landing / marketing shell for the home SPA.
 *
 * - Light-only, playful "happy pink" look via `data-theme="home"`.
 * - Hosts the landing page and other public, CTA-driven pages.
 *
 * TODO (later): real nav, footer, hero, animated CTAs.
 */
export default function HomeLayout() {
  return (
    <div
      data-theme="home"
      className="min-h-svh flex flex-col bg-[var(--color-surface-canvas)] text-[var(--color-text-default)]"
    >
      <header className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-extrabold text-[var(--color-primary)]">
          🐾 Pet Heaven
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/login">Sign in</Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Child routes render here. */}
        <Outlet />
      </main>

      <footer className="px-6 py-8 text-center text-sm opacity-70">
        {/* TODO: footer links */}
        © Pet Heaven Society — placeholder footer
      </footer>
    </div>
  );
}
