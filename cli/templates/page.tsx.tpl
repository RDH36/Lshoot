import Link from "next/link";
import { listProjects } from "@/lib/project-loader";
import { FadeIn } from "@/components/fade-in";

const ACCENT = "#059669";
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
        className="container mx-auto max-w-6xl px-6 py-6 flex items-center justify-between text-[12px]"
        style={{ color: "#78716c" }}
      >
        <span>Your local Lshoot instance</span>
        <Link href="/docs" className="hover:opacity-70">
          Help →
        </Link>
      </div>
    </footer>
  );
}
