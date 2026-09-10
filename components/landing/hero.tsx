import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "./chrome";
import { FONT, GITHUB_URL, HERO_RENDER, INSTALL_CMD, T } from "./theme";

const rise = (i: number) => ({
  animationDelay: `${120 + i * 110}ms`,
});

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <DotGrid />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-8 items-center">
        <div>
          <p
            className="lshoot-rise inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase"
            style={{ ...rise(0), borderColor: T.line, color: T.muted, background: "#fff" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
            Open-source · Local-first · Pixel-exact
          </p>
          <h1
            className="lshoot-rise mt-6 text-[2.9rem] sm:text-[3.8rem] lg:text-[4.6rem] font-extrabold leading-[0.96] tracking-[-0.03em]"
            style={{ ...rise(1), fontFamily: FONT.display, color: T.ink }}
          >
            App Store screenshots,
            <br />
            <span style={{ color: T.accent }}>written in JSX.</span>
          </h1>
          <p
            className="lshoot-rise mt-7 max-w-[34rem] text-[17px] sm:text-[19px] leading-relaxed"
            style={{ ...rise(2), color: T.muted }}
          >
            Describe each screen once as a React component. Lshoot renders every
            Apple and Google format, in every language you declare, into
            ready-to-upload PNGs. No Figma, no cloud, no account.
          </p>
          <div className="lshoot-rise mt-9 flex flex-wrap items-center gap-3" style={rise(3)}>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full px-6 h-12 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: T.accent, color: "#fff" }}
            >
              Get started <span aria-hidden>→</span>
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full px-6 h-12 text-[15px] font-semibold border transition-colors hover:bg-black/[0.04]"
              style={{ borderColor: T.line, color: T.ink, background: "#fff" }}
            >
              <GitHubIcon /> Star on GitHub
            </a>
          </div>
          <div
            className="lshoot-rise mt-8 inline-flex items-center gap-3 rounded-lg border px-4 py-2.5 text-[13px]"
            style={{ ...rise(4), borderColor: T.line, background: T.ink2, color: "#E7E4DC", fontFamily: FONT.mono }}
          >
            <span style={{ color: T.accentBright }}>$</span>
            {INSTALL_CMD}
          </div>
        </div>

        <RenderDemo />
      </div>
    </section>
  );
}

function RenderDemo() {
  return (
    <div className="lshoot-rise relative mx-auto w-full max-w-[34rem] aspect-[10/11]" style={rise(2)}>
      <div
        className="absolute right-0 top-0 w-[56%] rotate-[2.5deg] rounded-[1.6rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/10"
      >
        <Image
          src={HERO_RENDER.src}
          alt="Lshoot App Store screenshot rendered from JSX"
          width={HERO_RENDER.width}
          height={HERO_RENDER.height}
          priority
          sizes="(min-width: 1024px) 20rem, 60vw"
          className="block w-full h-auto"
        />
      </div>
      <div
        className="absolute right-[2%] top-[70%] z-20 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
        style={{ background: "#FFFFFF", color: T.ink, fontFamily: FONT.mono }}
      >
        <span aria-hidden style={{ color: T.accent }}>●</span> {HERO_RENDER.format} · 1320×2868
      </div>
      <CodeCard />
    </div>
  );
}

function CodeCard() {
  const k = { color: "#C792EA" };
  const tag = { color: "#7FDBCA" };
  const attr = { color: "#ADDB67" };
  const str = { color: "#ECC48D" };
  const cm = { color: "#6B7280" };
  return (
    <div
      className="absolute left-0 bottom-[4%] z-10 w-[68%] -rotate-[2deg] rounded-2xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
      style={{ background: T.ink2 }}
    >
      <div className="flex items-center gap-1.5 px-4 h-9 border-b border-white/[0.08]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px]" style={{ color: "#8B8F98", fontFamily: FONT.mono }}>
          projects/lshoot/screenshots/01-jsx.tsx
        </span>
      </div>
      <pre
        className="px-4 py-4 text-[11px] sm:text-[12px] leading-[1.7] overflow-hidden"
        style={{ color: "#D6DEEB", fontFamily: FONT.mono }}
      >
        <span style={cm}>{"// Lshoot's own App Store screenshot"}</span>{"\n"}
        <span style={k}>export default function</span> Jsx() {"{"}{"\n"}
        {"  "}<span style={k}>return</span> ({"\n"}
        {"    "}<span style={tag}>{"<LshootLayout"}</span>{"\n"}
        {"      "}<span style={attr}>headline</span>=<span style={str}>{'"Screenshots, written in JSX"'}</span>{"\n"}
        {"      "}<span style={attr}>screen</span>={"{"}<span style={tag}>{"<StudioMockup />"}</span>{"}"}{"\n"}
        {"    "}<span style={tag}>{"/>"}</span>{"\n"}
        {"  "});{"\n"}
        {"}"}
      </pre>
    </div>
  );
}

function DotGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(${T.line} 1px, transparent 1px)`,
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(ellipse 70% 60% at 60% 40%, #000 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 60% 40%, #000 20%, transparent 75%)",
        opacity: 0.9,
      }}
    />
  );
}
