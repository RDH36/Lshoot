// Template: Device Center + Headline Above — feature showcase (workhorse)
import { AppMockup, GradientBackground, Subheadline } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#60a5fa";

export default function Features({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#ffffff"
      background={
        <GradientBackground
          from="#0c1e3a"
          via="#1e3a8a"
          to="#2563eb"
          direction="to-b"
        />
      }
      headline={
        <h1 className="text-[9.5rem] font-black leading-[0.9] tracking-tight">
          {t.features.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <Subheadline size="lg" color="#dbeafe">
          {t.features.sub}
        </Subheadline>
      }
      mockup={
        <AppMockup
          src="/api/assets/example-app/home.png"
          device="iphone-15-pro"
        />
      }
    />
  );
}
