// Template: Hero + Bold Typography — 1st screenshot, value prop first, device peeking in
import { DeviceFrame, GradientBackground, Subheadline } from "@/components/aso";
import { EXAMPLE_FONT } from "../components/Layout";
import { HabitMockup } from "../components/HabitMockup";
import { useT } from "../i18n";

const ACCENT = "#fde68a";

export default function Hero({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ fontFamily: EXAMPLE_FONT }}>
      <GradientBackground from="#9f1239" via="#dc2626" to="#f97316" direction="to-br" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 2px, transparent 2px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col items-center pt-[12%] px-[8%] text-center">
        <span className="rounded-full bg-white/15 px-[2.4rem] py-[1rem] text-[2rem] font-bold uppercase tracking-[0.2em] text-white/90">
          #1 Habit tracker
        </span>
        <h1 className="mt-[5%] text-[11rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-white">
          {t.hero.headline(ACCENT)}
        </h1>
        <div className="mt-[4%]">
          <Subheadline size="xl" color="#fff1f2">
            {t.hero.sub}
          </Subheadline>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[-28%] z-10 flex justify-center">
        <div
          className="w-[72%]"
          style={{
            transform: "rotate(-6deg)",
            filter: "drop-shadow(0 60px 90px rgba(80, 10, 20, 0.55))",
          }}
        >
          <DeviceFrame className="w-full">
            <HabitMockup t={t.mock} accent="#e11d48" />
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
}
