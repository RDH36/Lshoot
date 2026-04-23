// Template: Split pattern — here via ExampleLayout for consistent proportions
// (a true SplitLayout works better for apps with longer text blocks)
import { AppMockup, SolidBackground, Subheadline } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#34d399";

export default function Split({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#ffffff"
      background={<SolidBackground color="#064e3b" />}
      headline={
        <h1 className="text-[9.5rem] font-black leading-[0.9] tracking-tight">
          {t.split.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <Subheadline size="lg" color="#a7f3d0">
          {t.split.sub}
        </Subheadline>
      }
      mockup={
        <AppMockup
          src="/api/assets/example-app/home.png"
          device="iphone-15"
        />
      }
    />
  );
}
