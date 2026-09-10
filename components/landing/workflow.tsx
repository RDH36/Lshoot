import { FONT, T } from "./theme";

const STEPS = [
  {
    title: "Scaffold in one command",
    desc: "npx lshoot my-app clones the repo, swaps the marketing landing for your own dashboard, and installs dependencies.",
    code: "npx lshoot my-app",
  },
  {
    title: "Describe a project",
    desc: "A folder in projects/ with a config.json: name, bundleId, languages. It shows up in the dashboard instantly.",
    code: "projects/my-app/config.json",
  },
  {
    title: "Write screens in JSX",
    desc: "One TSX file per screenshot, built from @/components/aso. Or hand an ASO brief to Claude Code and let the bundled skill write them.",
    code: "screenshots/01-hero.tsx",
  },
  {
    title: "Drop in your captures",
    desc: "Drag simulator or emulator screenshots into the dashboard. Reference them inside a rounded phone frame with <AppMockup />.",
    code: "<AppMockup src=\"/api/assets/my-app/home.png\" />",
  },
  {
    title: "Export, then upload",
    desc: "Pick screenshots, formats and languages. Puppeteer renders, Sharp downsamples. The output folder is App Store Connect and Play Console ready.",
    code: "exports/my-app/en/appstore/iphone-6.9/",
  },
];

export function Workflow() {
  return (
    <section id="how" style={{ background: T.paper }}>
      <div className="mx-auto max-w-6xl px-6 py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start">
          <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: T.accent, fontFamily: FONT.mono }}>
            Workflow
          </p>
          <h2
            className="mt-3 text-[2.2rem] sm:text-[3rem] font-extrabold leading-[1] tracking-[-0.025em]"
            style={{ fontFamily: FONT.display, color: T.ink }}
          >
            Five steps.
            <br />
            One minute per app.
          </h2>
          <p className="mt-6 max-w-[26rem] text-[15px] leading-relaxed" style={{ color: T.muted }}>
            Screenshots live next to your code. Change a headline, re-export, ship. No
            design tool round-trips, no resizing by hand.
          </p>
        </div>

        <ol className="border-t" style={{ borderColor: T.line }}>
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 py-8 border-b"
              style={{ borderColor: T.line }}
            >
              <span
                className="text-[2.4rem] sm:text-[3rem] font-extrabold leading-none tracking-[-0.04em]"
                style={{ fontFamily: FONT.display, color: T.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[19px] font-bold tracking-tight" style={{ fontFamily: FONT.display, color: T.ink }}>
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: T.muted }}>
                  {s.desc}
                </p>
                <code
                  className="mt-3 inline-block rounded-md px-2.5 py-1 text-[12px]"
                  style={{ background: T.paper2, color: T.ink, fontFamily: FONT.mono }}
                >
                  {s.code}
                </code>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
