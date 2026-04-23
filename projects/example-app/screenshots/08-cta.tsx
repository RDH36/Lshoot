// Template: Call to Action — final conversion screen
import { GradientBackground, Subheadline } from "@/components/aso";
import { useT } from "../i18n";

const ACCENT = "#fbcfe8";

export default function Cta({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <div
      className="w-full h-full"
      style={{ fontFamily: "var(--font-roboto), sans-serif" }}
    >
      <GradientBackground
        from="#db2777"
        via="#e11d48"
        to="#f97316"
        direction="to-br"
      />
      <div className="relative w-full h-full flex flex-col items-center justify-center px-[8%] text-center">
        <h1 className="text-[11rem] font-black leading-[0.9] tracking-tight text-white">
          {t.cta.headline(ACCENT)}
        </h1>
        <div className="mt-[5%]">
          <Subheadline size="xl" color="#fdf2f8">
            {t.cta.sub}
          </Subheadline>
        </div>
        <div
          className="mt-[8%] flex items-center gap-[1.5rem] px-[2.5rem] py-[1.5rem] bg-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          style={{ fontFamily: "var(--font-roboto), sans-serif" }}
        >
          <span className="text-[3rem] font-bold text-neutral-900">
            {t.cta.button}
          </span>
          <span className="text-[3rem]">→</span>
        </div>
      </div>
    </div>
  );
}
