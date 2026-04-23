// Template: Minimalist + Whitespace — premium/wellness aesthetic
import { AppMockup, SolidBackground, Subheadline } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#78716c";

export default function Minimalist({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#0c0a09"
      background={<SolidBackground color="#fafaf9" />}
      headline={
        <h1 className="text-[9.5rem] font-black leading-[0.9] tracking-tight">
          {t.minimalist.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <Subheadline size="lg" color="#57534e">
          {t.minimalist.sub}
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
