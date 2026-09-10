// Fake mobile view of the Lshoot editor: project header, file tabs, JSX source,
// export card. Pure HTML so it stays crisp at any export size.
const MONO = "var(--font-geist-mono), monospace";
const DISPLAY = "var(--font-bricolage), sans-serif";
const EMERALD = "#34D399";
const CARD = "#15161A";

const TABS = ["01-hero.tsx", "02-features.tsx", "i18n.tsx"];
const FORMATS = ["iPhone 6.9″", "iPhone 6.7″", "iPad 13″", "Android phone", "Tablet 10″"];

const k = { color: "#C792EA" };
const tag = { color: "#7FDBCA" };
const attr = { color: "#ADDB67" };
const str = { color: "#ECC48D" };
const cm = { color: "#6B7280" };

export function EditorMockup() {
  return (
    <div className="w-full h-full flex flex-col text-white" style={{ background: "#0B0D10" }}>
      <div className="flex items-center justify-between px-[7%] pt-[5%] text-[2.2rem] font-semibold text-white/80">
        <span>9:41</span>
        <span className="flex items-center gap-[0.8rem]">
          <span className="text-[1.8rem] tracking-[0.2em]">●●●</span>
          <span className="inline-block w-[4.4rem] h-[2rem] rounded-[0.5rem] border-[3px] border-white/70 relative">
            <span className="absolute inset-[3px] right-[20%] rounded-[0.2rem] bg-white/80" />
          </span>
        </span>
      </div>

      <div className="flex items-center justify-between px-[7%] mt-[6%]">
        <div className="flex items-center gap-[1.4rem]">
          <span className="flex items-center justify-center w-[6.2rem] h-[6.2rem] rounded-[1.5rem] bg-[#059669]">
            <span className="text-[3.6rem] font-extrabold leading-none" style={{ fontFamily: DISPLAY }}>L</span>
          </span>
          <span className="text-[3.6rem] font-bold tracking-tight" style={{ fontFamily: DISPLAY }}>Lshoot</span>
        </div>
        <span className="rounded-full bg-white/10 px-[2.2rem] py-[0.9rem] text-[2rem]" style={{ fontFamily: MONO }}>
          my-app · en
        </span>
      </div>

      <div className="flex gap-[2.4rem] px-[7%] mt-[6%] text-[2.1rem]" style={{ fontFamily: MONO }}>
        {TABS.map((t, i) => (
          <span
            key={t}
            className={`pb-[1rem] border-b-[4px] ${i === 0 ? "text-white" : "text-white/40"}`}
            style={{ borderColor: i === 0 ? EMERALD : "transparent" }}
          >
            {t}
          </span>
        ))}
      </div>

      <pre
        className="mx-[7%] mt-[4%] rounded-[2.4rem] p-[5%] text-[2.3rem] leading-[1.7] overflow-hidden"
        style={{ background: CARD, color: "#D6DEEB", fontFamily: MONO }}
      >
        <span style={cm}>{"// value prop, 6 words"}</span>{"\n"}
        <span style={k}>export default function</span> Hero() {"{"}{"\n"}
        {"  "}<span style={k}>return</span> ({"\n"}
        {"    "}<span style={tag}>{"<CenteredLayout"}</span>{"\n"}
        {"      "}<span style={attr}>headline</span>=<span style={str}>{'"Ship faster"'}</span>{"\n"}
        {"      "}<span style={attr}>mockup</span>={"{"}<span style={tag}>{"<AppMockup"}</span>{"\n"}
        {"        "}<span style={attr}>src</span>=<span style={str}>{'"/api/assets/my-app/home.png"'}</span>{"\n"}
        {"      "}<span style={tag}>{"/>"}</span>{"}"}{"\n"}
        {"    "}<span style={tag}>{"/>"}</span>{"\n"}
        {"  "});{"\n"}
        {"}"}
      </pre>

      <div className="mx-[7%] mt-auto mb-[34%] rounded-[2.4rem] p-[5%]" style={{ background: CARD }}>
        <div className="flex items-center justify-between text-[2.3rem]">
          <span className="font-bold" style={{ fontFamily: DISPLAY }}>Export</span>
          <span style={{ color: EMERALD, fontFamily: MONO }}>9 formats · 2 languages</span>
        </div>
        <div className="mt-[3.5%] flex flex-wrap gap-[1rem]">
          {FORMATS.map((f) => (
            <span key={f} className="rounded-full border border-white/15 px-[1.8rem] py-[0.7rem] text-[1.85rem] text-white/80">
              {f}
            </span>
          ))}
        </div>
        <div className="mt-[4.5%] h-[1.1rem] rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[72%] rounded-full" style={{ background: EMERALD }} />
        </div>
        <div className="mt-[2.5%] text-[1.9rem] text-white/50" style={{ fontFamily: MONO }}>
          rendering 13 / 18 · exports/my-app/en/appstore/
        </div>
      </div>
    </div>
  );
}
