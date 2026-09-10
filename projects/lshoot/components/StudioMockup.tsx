// Lshoot's app screen: a project with its screenshot grid, format chips and
// the export bar. Pure HTML so it stays crisp at any export size.
const MONO = "var(--font-geist-mono), monospace";
const DISPLAY = "var(--font-bricolage), sans-serif";
const EMERALD = "#34D399";
const CARD = "#181B21";

type Thumb = { title: string; accent: string; bg: string; ink: string };

const THUMBS: Thumb[] = [
  { title: "Build habits that stick", accent: "#FDE68A", bg: "linear-gradient(150deg,#9F1239,#F97316)", ink: "#fff" },
  { title: "Everything in one place", accent: "#7DD3FC", bg: "linear-gradient(160deg,#0B1A3A,#2563EB)", ink: "#fff" },
  { title: "Track what matters", accent: "#34D399", bg: "#064E3B", ink: "#fff" },
  { title: "Designed for focus", accent: "#B45309", bg: "linear-gradient(150deg,#FEF3C7,#F59E0B)", ink: "#78350F" },
  { title: "Less noise. More flow.", accent: "#A8A29E", bg: "#F7F5F0", ink: "#0C0A09" },
  { title: "Built for power users", accent: "#22D3EE", bg: "#09090B", ink: "#fff" },
];

const FORMATS = ["iPhone 6.9″", "iPhone 6.7″", "iPad 13″", "Android", "Tablet 10″", "+4"];

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[7%] pt-[5%] text-[2.2rem] font-semibold text-white/80">
      <span>9:41</span>
      <span className="flex items-center gap-[0.8rem]">
        <span className="text-[1.8rem] tracking-[0.2em]">●●●</span>
        <span className="inline-block w-[4.4rem] h-[2rem] rounded-[0.5rem] border-[3px] border-white/70 relative">
          <span className="absolute inset-[3px] right-[20%] rounded-[0.2rem] bg-white/80" />
        </span>
      </span>
    </div>
  );
}

function Thumbnail({ title, accent, bg, ink }: Thumb) {
  return (
    <div
      className="relative rounded-[1.8rem] overflow-hidden ring-[3px] ring-white/10"
      style={{ aspectRatio: "9 / 13", background: bg }}
    >
      <p
        className="absolute inset-x-[9%] top-[8%] text-[1.55rem] font-extrabold leading-[1.05] tracking-tight"
        style={{ color: ink, fontFamily: DISPLAY }}
      >
        {title}
      </p>
      <div
        className="absolute inset-x-[16%] bottom-0 top-[46%] rounded-t-[1.1rem] border-[3px] border-b-0"
        style={{ borderColor: ink === "#fff" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)", background: "rgba(0,0,0,0.18)" }}
      >
        <span className="block mx-auto mt-[10%] h-[0.45rem] w-[35%] rounded-full" style={{ background: accent }} />
        <span className="block mx-auto mt-[14%] h-[0.35rem] w-[62%] rounded-full bg-white/25" />
        <span className="block mx-auto mt-[7%] h-[0.35rem] w-[48%] rounded-full bg-white/20" />
      </div>
    </div>
  );
}

export function StudioMockup() {
  return (
    <div className="w-full h-full flex flex-col text-white" style={{ background: "#0B0D10" }}>
      <StatusBar />

      <div className="flex items-center justify-between px-[7%] mt-[6%]">
        <div className="flex items-center gap-[1.4rem]">
          <span className="flex items-center justify-center w-[5.6rem] h-[5.6rem] rounded-[1.5rem] bg-[#059669]">
            <span className="text-[3.2rem] font-extrabold leading-none" style={{ fontFamily: DISPLAY }}>L</span>
          </span>
          <span>
            <span className="block text-[2.9rem] font-bold leading-none tracking-tight" style={{ fontFamily: DISPLAY }}>
              my-app
            </span>
            <span className="block text-[1.7rem] mt-[0.5rem] text-white/45" style={{ fontFamily: MONO }}>
              com.acme.myapp
            </span>
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-[2rem] py-[0.9rem] text-[1.9rem]" style={{ fontFamily: MONO }}>
          EN · FR
        </span>
      </div>

      <div className="flex items-center justify-between px-[7%] mt-[7%]">
        <span className="text-[2.3rem] font-bold" style={{ fontFamily: DISPLAY }}>8 screenshots</span>
        <span className="text-[1.9rem]" style={{ color: EMERALD, fontFamily: MONO }}>live preview</span>
      </div>

      <div className="grid grid-cols-3 gap-[3%] px-[7%] mt-[3.5%]">
        {THUMBS.map((t) => (
          <Thumbnail key={t.title} {...t} />
        ))}
      </div>

      <div className="mx-[7%] mt-auto rounded-[2.4rem] p-[5%]" style={{ background: CARD }}>
        <div className="flex items-center justify-between">
          <span className="text-[2.4rem] font-bold" style={{ fontFamily: DISPLAY }}>Export</span>
          <span className="text-[1.9rem]" style={{ color: EMERALD, fontFamily: MONO }}>9 formats · 2 languages</span>
        </div>
        <div className="mt-[4%] flex flex-wrap gap-[0.9rem]">
          {FORMATS.map((f) => (
            <span key={f} className="rounded-full border border-white/15 px-[1.6rem] py-[0.6rem] text-[1.8rem] text-white/80">
              {f}
            </span>
          ))}
        </div>
        <div
          className="mt-[5%] flex items-center justify-center gap-[1.2rem] rounded-[1.6rem] py-[1.5rem] text-[2.3rem] font-bold text-[#04261D]"
          style={{ background: EMERALD, fontFamily: DISPLAY }}
        >
          Export all <span aria-hidden>→</span>
        </div>
        <div className="mt-[3.5%] text-[1.8rem] text-white/45 text-center" style={{ fontFamily: MONO }}>
          rendering 13 / 18 · 2× DPR
        </div>
      </div>

      {/* Reserve the strip the ribbon covers, in % of the screen height so it
          holds at any export format. */}
      <div style={{ height: "19%", flexShrink: 0 }} />
    </div>
  );
}
