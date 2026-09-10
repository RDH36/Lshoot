// Template: Floating UI Callouts — feature cards positioned around the device
import { DeviceFrame, GradientBackground } from "@/components/aso";
import { ExampleLayout, EXAMPLE_FONT } from "../components/Layout";
import { HabitMockup } from "../components/HabitMockup";
import { useT } from "../i18n";

const ACCENT = "#9333ea";

type CardProps = {
  emoji: string;
  label: string;
  sub: string;
  className?: string;
  rotate?: number;
};

function FloatingCard({ emoji, label, sub, className = "", rotate = 0 }: CardProps) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-[1.4rem] rounded-[2.2rem] bg-white/90 px-[2rem] py-[1.5rem] shadow-[0_30px_70px_rgba(76,29,149,0.22)] ring-1 ring-white ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, fontFamily: EXAMPLE_FONT, backdropFilter: "blur(20px)" }}
    >
      <span className="flex items-center justify-center w-[5rem] h-[5rem] rounded-[1.5rem] bg-[#f3e8ff] text-[2.8rem]">
        {emoji}
      </span>
      <span>
        <span className="block text-[2rem] font-extrabold leading-tight text-[#1e1b4b]">{label}</span>
        <span className="block text-[1.4rem] font-medium text-[#6b7280] mt-[0.2rem]">{sub}</span>
      </span>
    </div>
  );
}

export default function Floating({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#1e1b4b"
      glow="#c084fc"
      background={<GradientBackground from="#ede9fe" via="#e9d5ff" to="#fce7f3" direction="to-br" />}
      headline={
        <h1 className="text-[9.5rem] font-extrabold leading-[0.92] tracking-[-0.03em]">
          {t.floating.headline(ACCENT)}
        </h1>
      }
      mockup={
        <div className="relative h-full flex items-center">
          <DeviceFrame className="h-full w-auto">
            <HabitMockup t={t.mock} accent="#9333ea" />
          </DeviceFrame>
          <FloatingCard {...t.floating.cards[0]} className="top-[10%] -left-[18%]" rotate={-6} />
          <FloatingCard {...t.floating.cards[1]} className="top-[42%] -right-[20%]" rotate={5} />
          <FloatingCard {...t.floating.cards[2]} className="bottom-[10%] -left-[16%]" rotate={-3} />
        </div>
      }
    />
  );
}
