// HTML mockup of a habit-tracker home screen — localizable, tintable, no PNG.
// Sized for a phone frame ~700-800px wide (canvas 1320×2868, device ~60% height).
import type { T } from "../i18n";

type Props = {
  t: T["mock"];
  accent?: string;
  dark?: boolean;
};

const FONT = "var(--font-plus-jakarta), sans-serif";

export function HabitMockup({ t, accent = "#2563eb", dark = false }: Props) {
  const bg = dark ? "#0f1115" : "#f5f6f8";
  const card = dark ? "#181b21" : "#ffffff";
  const ink = dark ? "#f4f4f5" : "#111318";
  const muted = dark ? "#8b8f98" : "#6b7280";
  const line = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const done = 4;
  const total = t.habits.length;
  const r = 4.6;
  const circ = 2 * Math.PI * r;

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: bg, color: ink, fontFamily: FONT }}
    >
      <div className="flex items-center justify-between px-[8%] pt-[6%] text-[1.9rem] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-[0.6rem]">
          <span className="text-[1.5rem] tracking-[0.15em]">●●●</span>
          <span className="inline-block w-[3.6rem] h-[1.7rem] rounded-[0.45rem] border-[3px] relative" style={{ borderColor: ink }}>
            <span className="absolute inset-[3px] right-[25%] rounded-[0.2rem]" style={{ background: ink }} />
          </span>
        </span>
      </div>

      <div className="px-[8%] mt-[7%]">
        <p className="text-[1.6rem] font-medium" style={{ color: muted }}>{t.date}</p>
        <h1 className="text-[3.1rem] font-extrabold leading-[1.1] tracking-tight mt-[0.4rem]">{t.greeting}</h1>
      </div>

      <div
        className="mx-[8%] mt-[6%] rounded-[2.2rem] p-[6%] flex items-center justify-between"
        style={{ background: accent, color: "#fff" }}
      >
        <div>
          <p className="text-[1.6rem] font-semibold opacity-80">{t.streak}</p>
          <p className="text-[5.4rem] font-extrabold leading-none mt-[0.6rem] tracking-tight">
            12 <span className="text-[2.2rem] font-bold opacity-90">{t.days}</span>
          </p>
          <p className="text-[1.5rem] mt-[1rem] opacity-80">🔥 {t.best}</p>
        </div>
        <svg viewBox="0 0 12 12" className="w-[9.5rem] h-[9.5rem] -rotate-90">
          <circle cx="6" cy="6" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3" />
          <circle
            cx="6" cy="6" r={r} fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"
            strokeDasharray={`${(circ * done) / total} ${circ}`}
          />
          <text x="6" y="6.8" textAnchor="middle" fontSize="2.4" fontWeight="800" fill="#fff" transform="rotate(90 6 6)">
            {done}/{total}
          </text>
        </svg>
      </div>

      <div className="px-[8%] mt-[7%] flex items-center justify-between">
        <h2 className="text-[2.1rem] font-bold">{t.today}</h2>
        <span className="text-[1.5rem] font-semibold" style={{ color: accent }}>{t.seeAll}</span>
      </div>

      <div className="mx-[8%] mt-[3%] rounded-[2.2rem] overflow-hidden" style={{ background: card }}>
        {t.habits.map((h, i) => {
          const isDone = i < done;
          return (
            <div
              key={h.name}
              className="flex items-center gap-[1.6rem] px-[5%] py-[4.2%]"
              style={{ borderTop: i === 0 ? "none" : `2px solid ${line}` }}
            >
              <span
                className="flex items-center justify-center w-[4.6rem] h-[4.6rem] rounded-[1.4rem] text-[2.3rem]"
                style={{ background: dark ? "rgba(255,255,255,0.06)" : "#f1f3f6" }}
              >
                {h.emoji}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[1.85rem] font-bold leading-tight truncate">{h.name}</span>
                <span className="block text-[1.4rem] mt-[0.3rem]" style={{ color: muted }}>{h.meta}</span>
              </span>
              <span
                className="flex items-center justify-center w-[3.4rem] h-[3.4rem] rounded-full border-[3px] text-[1.9rem] font-black"
                style={{
                  borderColor: isDone ? accent : line,
                  background: isDone ? accent : "transparent",
                  color: "#fff",
                }}
              >
                {isDone ? "✓" : ""}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="mt-auto mx-[8%] mb-[6%] rounded-[2.4rem] px-[8%] py-[4%] flex items-center justify-between text-[2.4rem]"
        style={{ background: card, boxShadow: dark ? "none" : "0 12px 40px rgba(0,0,0,0.06)" }}
      >
        <span style={{ color: accent }}>⌂</span>
        <span style={{ color: muted }}>▤</span>
        <span
          className="flex items-center justify-center w-[5rem] h-[5rem] rounded-full text-white text-[2.6rem] font-bold -mt-[2.4rem]"
          style={{ background: accent, boxShadow: `0 10px 30px ${accent}66` }}
        >
          +
        </span>
        <span style={{ color: muted }}>◔</span>
        <span style={{ color: muted }}>☺</span>
      </div>
    </div>
  );
}
