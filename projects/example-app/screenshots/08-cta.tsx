// Template: Call to Action — final conversion screen: icon, rating, button, stores
import { GradientBackground, Subheadline } from "@/components/aso";
import { EXAMPLE_FONT } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#fbcfe8";

export default function Cta({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ fontFamily: EXAMPLE_FONT }}>
      <GradientBackground from="#be185d" via="#e11d48" to="#f97316" direction="to-br" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[30%] h-[40%] w-[80%] -translate-x-1/2 rounded-full"
        style={{ background: "#fff", opacity: 0.18, filter: "blur(160px)" }}
      />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-[8%] text-center text-white">
        <div
          className="flex items-center justify-center w-[18rem] h-[18rem] rounded-[4.5rem] text-[9rem] shadow-[0_40px_90px_rgba(0,0,0,0.35)] ring-[6px] ring-white/30"
          style={{ background: "linear-gradient(145deg, #fff 0%, #ffe4e6 100%)" }}
        >
          ✓
        </div>
        <h1 className="mt-[7%] text-[11rem] font-extrabold leading-[0.92] tracking-[-0.03em]">
          {t.cta.headline(ACCENT)}
        </h1>
        <div className="mt-[4%]">
          <Subheadline size="xl" color="#fdf2f8">
            {t.cta.sub}
          </Subheadline>
        </div>
        <div className="mt-[4%] flex items-center gap-[1rem] text-[2.4rem] font-semibold text-[#fde68a]">
          <span className="tracking-[0.1em]">★★★★★</span>
          <span className="text-white/85">{t.cta.rating}</span>
        </div>
        <div className="mt-[7%] flex items-center gap-[1.6rem] rounded-full bg-white px-[4rem] py-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.3)]">
          <span className="text-[3.2rem] font-extrabold text-[#1c1917]">{t.cta.button}</span>
          <span className="text-[3.2rem] text-[#e11d48]">→</span>
        </div>
        <div className="mt-[5%] flex items-center gap-[1.5rem] text-[2rem] font-semibold">
          {t.cta.stores.map((s) => (
            <span key={s} className="rounded-full border-[3px] border-white/40 px-[2.4rem] py-[1rem]">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
