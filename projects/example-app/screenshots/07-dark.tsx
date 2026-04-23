// Template: Dark SaaS — Linear/Superhuman aesthetic with colored glow
import { AppMockup, SolidBackground, Subheadline } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#22d3ee";

export default function Dark({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#ffffff"
      background={<SolidBackground color="#09090b" />}
      headline={
        <h1 className="text-[9.5rem] font-black leading-[0.9] tracking-tight">
          {t.dark.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <Subheadline size="lg" color="#a1a1aa">
          {t.dark.sub}
        </Subheadline>
      }
      mockup={
        <div
          className="h-full"
          style={{
            filter: "drop-shadow(0 30px 60px rgba(34, 211, 238, 0.4))",
          }}
        >
          <AppMockup
            src="/api/assets/example-app/home.png"
            device="iphone-15-pro"
          />
        </div>
      }
    />
  );
}
