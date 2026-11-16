import { Outlet } from "react-router-dom";

import { HomeNav } from "@/pages/home/sections";

/**
 * Public landing / marketing shell for the home SPA.
 *
 * Applies the light-only, playful "happy pink" theme (`data-theme="home"`) and
 * the "canvas" frame (like the reference): the nav lays directly on the canvas,
 * and the rounded inner surface (inset by a small gutter) holds the page
 * content. Each public page renders its own footer.
 */
export default function HomeLayout() {
  return (
    <div data-theme="home" className="page-canvas min-h-svh">
      <HomeNav />
      <div className="page-canvas-surface text-[var(--color-text-default)]">
        <Outlet />
      </div>
    </div>
  );
}
