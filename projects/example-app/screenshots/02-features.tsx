// Template: Device Center + Headline Above — feature showcase (workhorse)
import { DeviceFrame, GradientBackground, Subheadline } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { HabitMockup } from "../components/HabitMockup";
import { useT } from "../i18n";

const ACCENT = "#7dd3fc";

export default function Features({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#ffffff"
      glow="#38bdf8"
      background={<GradientBackground from="#0b1a3a" via="#1e3a8a" to="#2563eb" direction="to-b" />}
      headline={
        <h1 className="text-[9.5rem] font-extrabold leading-[0.92] tracking-[-0.03em]">
          {t.features.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <Subheadline size="lg" color="#dbeafe">
          {t.features.sub}
        </Subheadline>
      }
      mockup={
        <DeviceFrame className="h-full w-auto">
          <HabitMockup t={t.mock} accent="#2563eb" />
        </DeviceFrame>
      }
    />
  );
}
