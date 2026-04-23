// Template: Hero + Bold Typography — 1st screenshot, drives value prop (no device)
import { GradientBackground, Headline, Subheadline } from "@/components/aso";
import { useT } from "../i18n";

const ACCENT = "#fef3c7";

export default function Hero({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <div
      className="w-full h-full"
      style={{ fontFamily: "var(--font-roboto), sans-serif" }}
    >
      <GradientBackground
        from="#991b1b"
        via="#dc2626"
        to="#f97316"
        direction="to-br"
      />
      <div className="relative w-full h-full flex flex-col items-center justify-center px-[8%] text-center">
        <h1 className="text-[11rem] font-black leading-[0.9] tracking-tight text-white">
          {t.hero.headline(ACCENT)}
        </h1>
        <div className="mt-[5%]">
          <Subheadline size="xl" color="#fef3c7">
            {t.hero.sub}
          </Subheadline>
        </div>
      </div>
    </div>
  );
}
