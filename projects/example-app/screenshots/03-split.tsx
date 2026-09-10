// Template: Split pattern — text block on top, device anchored to the bottom edge
import { DeviceFrame, SolidBackground, Subheadline } from "@/components/aso";
import { EXAMPLE_FONT } from "../components/Layout";
import { HabitMockup } from "../components/HabitMockup";
import { useT } from "../i18n";

const ACCENT = "#34d399";

export default function Split({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <div className="w-full h-full relative overflow-hidden text-white" style={{ fontFamily: EXAMPLE_FONT }}>
      <SolidBackground color="#064e3b" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[58%]"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))" }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="pt-[11%] px-[8%] text-left">
          <span className="text-[2rem] font-bold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
            Insights
          </span>
          <h1 className="mt-[3%] text-[9.5rem] font-extrabold leading-[0.92] tracking-[-0.03em]">
            {t.split.headline(ACCENT)}
          </h1>
          <div className="mt-[3%] max-w-[85%]">
            <Subheadline size="lg" align="left" color="#a7f3d0">
              {t.split.sub}
            </Subheadline>
          </div>
        </div>
        <div className="mt-auto flex justify-center px-[10%]" style={{ height: "58%" }}>
          <div className="w-full translate-y-[6%]" style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.45))" }}>
            <DeviceFrame variant="iphone-15" className="w-full">
              <HabitMockup t={t.mock} accent="#059669" dark />
            </DeviceFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
