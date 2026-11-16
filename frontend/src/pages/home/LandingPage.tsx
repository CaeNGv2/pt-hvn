import {
  HomeFooter,
  HomeHero,
  HowToHelp,
  Impact,
  SocialProof,
  WhoWeAre,
} from "@/pages/home/sections";

/**
 * Public landing page (home SPA).
 *
 * The nav lives in HomeLayout (laid on the canvas); this page renders the
 * content sections and its own footer. Sections live in ./sections.
 */
export default function LandingPage() {
  return (
    <>
      <main className="flex flex-col gap-16 pb-6">
        <HomeHero />
        <WhoWeAre />
        <HowToHelp />
        <Impact />
        <SocialProof />
      </main>
      <HomeFooter />
    </>
  );
}
