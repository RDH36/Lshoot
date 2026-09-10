import { FadeIn } from "@/components/fade-in";
import { Nav, Footer } from "@/components/landing/chrome";
import { Hero } from "@/components/landing/hero";
import { Showcase } from "@/components/landing/showcase";
import { Workflow } from "@/components/landing/workflow";
import { Features } from "@/components/landing/features";
import { CTA } from "@/components/landing/cta";
import { FONT, T } from "@/components/landing/theme";
import { AUTHOR, GITHUB_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const NAV_LINKS = [
  { href: "#showcase", label: "Showcase" },
  { href: "#how", label: "Workflow" },
  { href: "#features", label: "Features" },
  { href: "/docs", label: "Docs" },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  license: "https://opensource.org/licenses/MIT",
  codeRepository: GITHUB_URL,
  author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
};

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: T.paper, color: T.ink, fontFamily: FONT.body }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
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
