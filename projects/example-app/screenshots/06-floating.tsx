// Template: Floating UI Callouts — feature cards positioned around the device
import { AppMockup, GradientBackground } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#a855f7";

type CardProps = {
  emoji: string;
  label: string;
  sub: string;
  className?: string;
  rotate?: number;
};

function FloatingCard({
  emoji,
  label,
  sub,
  className = "",
  rotate = 0,
}: CardProps) {
  return (
    <div
      className={`absolute bg-white rounded-[2rem] px-[1.5rem] py-[1rem] shadow-[0_20px_60px_rgba(30,27,75,0.2)] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        fontFamily: "var(--font-roboto), sans-serif",
      }}
    >
      <div className="text-[3rem] leading-none mb-[0.25rem]">{emoji}</div>
      <div className="text-[1.6rem] font-bold leading-tight text-[#1e1b4b]">
        {label}
      </div>
      <div className="text-[1rem] text-neutral-500 mt-[0.1rem]">{sub}</div>
    </div>
  );
}

export default function Floating({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#1e1b4b"
      background={
        <GradientBackground
          from="#e9d5ff"
          via="#ddd6fe"
          to="#fce7f3"
          direction="to-br"
        />
      }
      headline={
        <h1 className="text-[9.5rem] font-black leading-[0.9] tracking-tight">
          {t.floating.headline(ACCENT)}
        </h1>
      }
      mockup={
        <div className="relative h-full flex items-center">
          <AppMockup
            src="/api/assets/example-app/home.png"
            device="iphone-15-pro"
          />
          <FloatingCard
            {...t.floating.cards[0]}
            className="top-[8%] -left-[14%]"
            rotate={-6}
          />
          <FloatingCard
            {...t.floating.cards[1]}
            className="top-[40%] -right-[14%]"
            rotate={5}
          />
          <FloatingCard
            {...t.floating.cards[2]}
            className="bottom-[10%] -left-[12%]"
            rotate={-3}
          />
        </div>
      }
    />
  );
}
