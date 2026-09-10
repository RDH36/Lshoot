// Template: Minimalist + Whitespace — premium/wellness aesthetic, quiet type
import { DeviceFrame, SolidBackground } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { HabitMockup } from "../components/HabitMockup";
import { useT } from "../i18n";

const ACCENT = "#a8a29e";

export default function Minimalist({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#0c0a09"
      background={<SolidBackground color="#f7f5f0" />}
      headline={
        <h1 className="text-[8.6rem] font-semibold leading-[1] tracking-[-0.03em]">
          {t.minimalist.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <p className="text-[2.6rem] font-medium tracking-[0.02em] uppercase" style={{ color: "#78716c" }}>
          {t.minimalist.sub}
        </p>
      }
      mockup={
        <div className="h-full" style={{ filter: "drop-shadow(0 30px 50px rgba(28, 25, 23, 0.18))" }}>
          <DeviceFrame className="h-full w-auto">
            <HabitMockup t={t.mock} accent="#292524" />
          </DeviceFrame>
        </div>
      }
    />
  );
}
