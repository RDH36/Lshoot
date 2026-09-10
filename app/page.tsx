import { FadeIn } from "@/components/fade-in";
import { Nav, Footer } from "@/components/landing/chrome";
import { Hero } from "@/components/landing/hero";
import { Showcase } from "@/components/landing/showcase";
import { Workflow } from "@/components/landing/workflow";
import { Features } from "@/components/landing/features";
import { CTA } from "@/components/landing/cta";
import { FONT, T } from "@/components/landing/theme";

const NAV_LINKS = [
  { href: "#showcase", label: "Showcase" },
  { href: "#how", label: "Workflow" },
  { href: "#features", label: "Features" },
  { href: "/docs", label: "Docs" },
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: T.paper, color: T.ink, fontFamily: FONT.body }}
    >
      <Nav links={NAV_LINKS} cta={{ href: "/docs", label: "Get started" }} />
      <Hero />
      <FadeIn>
        <Showcase />
      </FadeIn>
      <FadeIn>
        <Workflow />
      </FadeIn>
      <FadeIn>
        <Features />
      </FadeIn>
      <FadeIn>
        <CTA />
      </FadeIn>
      <Footer />
    </div>
  );
}
