import { FONT, T } from "./theme";

const ITEMS = [
  {
    title: "Deterministic renders",
    desc: "Chromium launched with Remotion-style flags: sRGB colors, no font hinting, identical output on every run.",
  },
  {
    title: "Every store format",
    desc: "iPhone 6.9″, 6.7″, 6.5″, 5.5″, iPad 13″ and 12.9″, Android phone, tablet 7″ and 10″. One click covers all of them.",
  },
  {
    title: "Multi-language",
    desc: "Declare languages in config.json, ship one dictionary, get one export folder per locale.",
  },
  {
    title: "Rounded phone frame",
    desc: "A clean bezel with no notch is the default mockup. iPhone, Android and iPad frames stay one prop away.",
  },
  {
    title: "8 reference templates",
    desc: "Hero, Device Center, Split, Tilted 3D, Minimalist, Floating UI, Dark SaaS, Call to Action. Copy, restyle, ship.",
  },
  {
    title: "Claude Code skill included",
    desc: "Point the bundled new-aso-project skill at a brief and get a full project scaffolded with copy and layouts.",
  },
];

export function Features() {
  return (
    <section id="features" style={{ background: T.paper2, borderTop: `1px solid ${T.line}` }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: T.accent, fontFamily: FONT.mono }}>
              What&apos;s inside
            </p>
            <h2
              className="mt-3 text-[2.2rem] sm:text-[3rem] font-extrabold leading-[1] tracking-[-0.025em]"
              style={{ fontFamily: FONT.display, color: T.ink }}
            >
              Built for devs who ship apps.
            </h2>
          </div>
          <p className="max-w-[22rem] text-[14px] leading-relaxed" style={{ color: T.muted }}>
            Next.js, Tailwind, Puppeteer and Sharp. Nothing proprietary, nothing
            hosted. Fork it, bend it, keep it.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border"
          style={{ borderColor: T.line, background: T.line }}
        >
          {ITEMS.map((item, i) => (
            <article
              key={item.title}
              className="group relative p-7 transition-colors"
              style={{ background: T.paper }}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: T.accent }}
              />
              <p className="text-[11px] tracking-[0.18em]" style={{ color: T.muted, fontFamily: FONT.mono }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="mt-4 text-[19px] font-bold tracking-tight"
                style={{ fontFamily: FONT.display, color: T.ink }}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: T.muted }}>
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
