import Link from "next/link";
import { listProjects } from "@/lib/project-loader";
import { FadeIn } from "@/components/fade-in";

const ACCENT = "#059669";
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
      className="min-h-screen flex flex-col"
      style={{ background: "#fafaf9", color: "#1c1917" }}
    >
      <Nav />
      <main className="flex-1">
        <Hero />
        {hasShowcase ? (
          <FadeIn delay={150}>
            <Showcase />
          </FadeIn>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-label="Lshoot"
    >
      <rect width="32" height="32" rx="7" fill={ACCENT} />
      <path d="M10 8H14V20H20V24H10V8Z" fill="#ffffff" />
      <circle cx="23" cy="22" r="2.5" fill="#ffffff" />
    </svg>
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
          <span>Lshoot</span>
        </Link>
        <nav className="flex items-center gap-5 text-[13px]">
          <Link href="/docs" style={{ color: "#57534e" }}>
            Docs
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
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium"
            style={{ background: ACCENT, color: "#ffffff" }}
          >
            Dashboard <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="container mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
      <p
        className="text-[12px] uppercase tracking-[0.2em] font-medium"
        style={{ color: "#78716c" }}
      >
        Your Lshoot instance
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
        ASO screenshots, written in code.
      </h1>
      <p
        className="mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        style={{ color: "#57534e" }}
      >
        Describe each App Store / Play Store screenshot as a React component.
        Lshoot renders every Apple and Google format, in every language you
        declare, into a single export folder. Everything runs locally.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg px-6 h-11 text-[14px] font-medium transition-colors"
          style={{ background: ACCENT, color: "#ffffff" }}
        >
          Read the docs <span aria-hidden>→</span>
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-lg px-6 h-11 text-[14px] font-medium border"
          style={{
            borderColor: "#d6d3d1",
            color: "#1c1917",
            background: "#ffffff",
          }}
        >
          Open dashboard
        </Link>
      </div>
      <p className="mt-6 text-[12px]" style={{ color: "#78716c" }}>
        Local-first · No account · Runs on{" "}
        <code
          className="px-1.5 py-0.5 rounded text-[11px] font-mono"
          style={{ background: "#f5f5f4" }}
        >
          localhost:3000
        </code>
      </p>
    </section>
  );
}

function Showcase() {
  return (
    <section className="container mx-auto max-w-6xl px-6 pb-20">
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

function Footer() {
  return (
    <footer
      className="border-t mt-8"
      style={{ borderColor: "#e7e5e4", background: "#f5f5f4" }}
    >
      <div
        className="container mx-auto max-w-6xl px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-[12px]"
        style={{ color: "#78716c" }}
      >
        <span>Your local Lshoot instance</span>
        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 hover:opacity-70"
          >
            <GitHubIcon /> GitHub
          </a>
          <Link href="/docs" className="hover:opacity-70">
            Help →
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
