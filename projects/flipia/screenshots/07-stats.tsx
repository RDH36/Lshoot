// Template: Flipia tight — progress
import { DeviceFrame } from "@/components/aso";
import { FlipiaLayout } from "../components/Layout";
import { GameMockup } from "../components/GameMockup";
import { useT } from "../i18n";

const ACCENT = "#1D9E75";

export default function Stats({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <FlipiaLayout
      headline={
        <h1 className="text-[11rem] font-bold leading-[0.9] tracking-tight text-[#1A1C17]">
          {t.stats.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <p
          className="text-[3.2rem] font-normal text-[#474553] leading-snug"
          style={{ fontFamily: "var(--font-nunito), sans-serif" }}
        >
          {t.stats.sub}
        </p>
      }
      mockup={
        <DeviceFrame
          variant="iphone-15-pro"
          className="h-full w-auto !rounded-[7%] !p-[2%]"
          screenClassName="!rounded-[5%]"
        >
          <GameMockup {...t.ui} scorePlayer={6} scoreOpponent={2} />
        </DeviceFrame>
      }
    />
  );
}
