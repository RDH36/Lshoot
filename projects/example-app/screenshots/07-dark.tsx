// Template: Dark SaaS — Linear/Superhuman aesthetic, grid + colored glow
import { DeviceFrame, PatternBackground, Subheadline } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { HabitMockup } from "../components/HabitMockup";
import { useT } from "../i18n";

const ACCENT = "#22d3ee";

export default function Dark({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#ffffff"
      glow="#06b6d4"
      background={<PatternBackground pattern="grid" color="#ffffff" bgColor="#09090b" size={72} opacity={0.06} />}
      headline={
        <h1 className="text-[9.5rem] font-extrabold leading-[0.92] tracking-[-0.03em]">
          {t.dark.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <Subheadline size="lg" color="#a1a1aa">
          {t.dark.sub}
        </Subheadline>
      }
      mockup={
        <div className="h-full" style={{ filter: "drop-shadow(0 30px 80px rgba(34, 211, 238, 0.35))" }}>
          <DeviceFrame className="h-full w-auto">
            <HabitMockup t={t.mock} accent="#06b6d4" dark />
          </DeviceFrame>
        </div>
      }
    />
  );
}
