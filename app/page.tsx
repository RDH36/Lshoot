import Link from "next/link";
import { listProjects } from "@/lib/project-loader";
import { FadeIn } from "@/components/fade-in";

const BRAND = "Lshoot";
const GITHUB_URL = "https://github.com/RDH36/Lshoot";
const SHOWCASE_SLUG = "flipia";
const SHOWCASE_SCREENS = [
  "01-duel",
  "02-tornado",
  "04-ranks",
  "05-offline",
  "07-stats",
  "08-daily",
];

export default async function HomePage() {
  const projects = await listProjects();
  const hasShowcase = projects.some((p) => p.slug === SHOWCASE_SLUG);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#fafaf9", color: "#1c1917" }}
    >
      <Nav />
      <FadeIn>
        <Hero />
      </FadeIn>
      {hasShowcase ? (
        <FadeIn delay={150}>
          <Showcase />
        </FadeIn>
      ) : null}
      <FadeIn delay={100}>
        <HowItWorks />
      </FadeIn>
      <FadeIn delay={100}>
        <Features />
      </FadeIn>
      <FadeIn delay={100}>
        <CTA />
      </FadeIn>
      <Footer />
    </div>
  );
}

function Logo({ size = 24 }: { size?: number }) {
  return (
    <div
      className="rounded-md flex items-center justify-center font-black"
      style={{
        background: "#059669",
        color: "#ffffff",
        width: size,
        height: size,
        fontSize: size * 0.5,
      }}
    >
      L
    </div>
  );
}

function Nav() {
  return (
    <header
      className="sticky top-0 z-20 backdrop-blur border-b"
      style={{
        background: "rgba(250, 250, 249, 0.85)",
        borderColor: "#e7e5e4",
      }}
    >
      <div className="container mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[15px]">
          <Logo />
          <span>{BRAND}</span>
        </Link>
        <nav className="flex items-center gap-5 text-[13px]">
          <Link
            href="#how"
            className="hidden sm:inline"
            style={{ color: "#57534e" }}
          >
            How it works
          </Link>
          <Link
            href="#features"
            className="hidden sm:inline"
            style={{ color: "#57534e" }}
          >
            Features
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 hover:opacity-80"
            style={{ color: "#57534e" }}
            aria-label="GitHub"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
            style={{ background: "#059669", color: "#ffffff" }}
          >
            Get Started <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
      <p
        className="text-[12px] uppercase tracking-[0.2em] font-medium"
        style={{ color: "#78716c" }}
      >
        Local-first · Open-source · Remotion-style
      </p>
      <h1 className="mt-6 text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight leading-[0.95]">
        Ship App Store screenshots
        <br />
        <span style={{ color: "#059669" }}>at the speed of code.</span>
      </h1>
      <p
        className="mt-7 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
        style={{ color: "#57534e" }}
      >
        Write your screenshots once in React. Export every Apple and Google format, in every
        language, in a single click.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg px-6 h-11 text-[14px] font-medium transition-colors"
          style={{ background: "#059669", color: "#ffffff" }}
        >
          Get Started <span aria-hidden>→</span>
        </Link>
        <Link
          href="#how"
          className="inline-flex items-center rounded-lg px-6 h-11 text-[14px] font-medium transition-colors border"
          style={{
            borderColor: "#d6d3d1",
            color: "#1c1917",
            background: "#ffffff",
          }}
        >
          How it works
        </Link>
      </div>
      <p className="mt-6 text-[12px]" style={{ color: "#78716c" }}>
        No account, no cloud — everything runs on{" "}
        <code
          className="px-1.5 py-0.5 rounded text-[11px] font-mono"
          style={{ background: "#f5f5f4" }}
        >
          localhost:3000
        </code>
        .
      </p>
    </section>
  );
}

function Showcase() {
  return (
    <section className="container mx-auto max-w-6xl px-6 pb-24">
      <div className="flex items-baseline justify-between mb-6">
        <p
          className="text-[12px] uppercase tracking-[0.2em] font-medium"
          style={{ color: "#78716c" }}
        >
          Live examples
        </p>
        <p className="text-[12px]" style={{ color: "#78716c" }}>
          Rendered from <code className="font-mono">projects/flipia/</code>
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SHOWCASE_SCREENS.map((screen, i) => (
          <FadeIn key={screen} delay={i * 80} distance={16}>
            <PreviewCard screen={screen} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function PreviewCard({ screen }: { screen: string }) {
  const SCALE = 0.12;
  const INVERSE = Math.round((1 / SCALE) * 100);
  return (
    <Link
      href={`/preview/${SHOWCASE_SLUG}/${screen}`}
      target="_blank"
      className="relative block aspect-[9/19.5] rounded-lg overflow-hidden border transition-colors"
      style={{ borderColor: "#e7e5e4", background: "#ffffff" }}
    >
      <iframe
        src={`/preview/${SHOWCASE_SLUG}/${screen}?format=phone&lang=en`}
        className="absolute inset-0 origin-top-left pointer-events-none border-0"
        style={{
          transform: `scale(${SCALE})`,
          width: `${INVERSE}%`,
          height: `${INVERSE}%`,
        }}
        title={screen}
        loading="lazy"
      />
    </Link>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Create a project",
      desc: "Drop a folder in projects/ with config.json (name, bundleId, languages). It appears in the dashboard instantly.",
    },
    {
      n: "02",
      title: "Write screenshots in JSX",
      desc: "Eight TSX files describing each screen with React components from @/components/aso. Or let Claude Code write them from your ASO brief.",
    },
    {
      n: "03",
      title: "Upload app captures",
      desc: "Drag and drop your Xcode simulator or Android emulator screenshots. Reference them with <AppMockup /> inside a DeviceFrame.",
    },
    {
      n: "04",
      title: "Click Export",
      desc: "Pick screenshots, formats, and languages. Puppeteer renders at 2x DPR, Sharp downsamples with Lanczos3. Pixel-exact PNGs.",
    },
    {
      n: "05",
      title: "Upload to the stores",
      desc: "Output is ready-to-upload to App Store Connect and Google Play Console. Done in under a minute per app.",
    },
  ];
  return (
    <section id="how" style={{ borderTop: "1px solid #e7e5e4" }}>
      <div className="container mx-auto max-w-4xl px-6 py-24">
        <div className="mb-12">
          <p
            className="text-[12px] uppercase tracking-[0.2em] font-medium"
            style={{ color: "#78716c" }}
          >
            Workflow
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Five steps. One minute per app.
          </h2>
        </div>
        <div
          className="divide-y border-y"
          style={{ borderColor: "#e7e5e4" }}
        >
          {steps.map((s) => (
            <div key={s.n} className="grid grid-cols-[56px_1fr] gap-6 py-6">
              <div
                className="font-mono text-[13px] pt-1"
                style={{ color: "#a8a29e" }}
              >
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold text-[17px]">{s.title}</h3>
                <p
                  className="mt-1.5 text-[14px] leading-relaxed"
                  style={{ color: "#57534e" }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: "Deterministic renders",
      desc: "Chromium with 26 Remotion-style flags. Colors in sRGB, fonts without hinting, deterministic frames.",
    },
    {
      title: "Every store format",
      desc: "iPhone 6.9, 6.7, 6.5, 5.5, iPad 13, iPad 12.9, Android phone, Android tablet 7 and 10.",
    },
    {
      title: "Multi-language",
      desc: "Declare languages in config.json, ship one dictionary, export one folder per locale.",
    },
    {
      title: "Selective export",
      desc: "Pick exactly which screenshots, formats, and languages to render. Skip the rest.",
    },
    {
      title: "8 reference templates",
      desc: "Hero, Device Center, Split, Tilted 3D, Minimalist, Floating UI, Dark SaaS, Call to Action.",
    },
    {
      title: "AI-friendly by default",
      desc: "Ships with a Claude Code skill. Point it at an ASO brief, get a full project scaffolded.",
    },
  ];
  return (
    <section
      id="features"
      style={{ borderTop: "1px solid #e7e5e4", background: "#f5f5f4" }}
    >
      <div className="container mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12">
          <p
            className="text-[12px] uppercase tracking-[0.2em] font-medium"
            style={{ color: "#78716c" }}
          >
            What's inside
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Built for devs who ship apps.
          </h2>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-xl overflow-hidden border"
          style={{ borderColor: "#e7e5e4", background: "#e7e5e4" }}
        >
          {items.map((item) => (
            <div
              key={item.title}
              className="p-6"
              style={{ background: "#fafaf9" }}
            >
              <h3 className="font-semibold text-[16px]">{item.title}</h3>
              <p
                className="mt-2 text-[14px] leading-relaxed"
                style={{ color: "#57534e" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ borderTop: "1px solid #e7e5e4" }}>
      <div className="container mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Ready to ship your next app?
        </h2>
        <p
          className="mt-4 max-w-xl mx-auto text-[15px]"
          style={{ color: "#57534e" }}
        >
          Start with the three-minute quickstart in the docs. The dashboard and your first
          project are one page away.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg px-6 h-11 text-[14px] font-medium transition-colors"
            style={{ background: "#059669", color: "#ffffff" }}
          >
            Get Started <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e7e5e4",
        background: "#f5f5f4",
      }}
    >
      <div className="container mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-[13px]" style={{ color: "#78716c" }}>
        <div className="flex items-center gap-2">
          <Logo size={20} />
          <span>{BRAND} · local-first ASO tool</span>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 hover:opacity-70"
          >
            <GitHubIcon /> GitHub
          </a>
          <Link href="/docs" className="hover:opacity-70">
            Docs
          </Link>
          <Link href="/dashboard" className="hover:opacity-70">
            Dashboard
          </Link>
          <Link href="/terms" className="hover:opacity-70">
            Terms
          </Link>
          <Link href="/privacy" className="hover:opacity-70">
            Privacy
          </Link>
          <Link href="/contact" className="hover:opacity-70">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.373.5 0 5.873 0 12.5c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.305.762-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016.002 0c2.292-1.552 3.298-1.23 3.298-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.48 5.921.43.371.814 1.102.814 2.222 0 1.604-.014 2.897-.014 3.29 0 .32.19.694.8.576C20.565 22.296 24 17.8 24 12.5 24 5.873 18.627.5 12 .5z" />
    </svg>
  );
}
