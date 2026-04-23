// Layout tight pour les screenshots Flipia : headline top big, device fill rest
// Device override : rounded réduit pour un look plus rectangulaire
import type { ReactNode } from "react";
import { DeviceFrame } from "@/components/aso";
import { GameMockup } from "./GameMockup";

type Props = {
  headline: ReactNode;
  subheadline?: ReactNode;
  bg?: string;
  mockup?: ReactNode;
};

export function FlipiaLayout({
  headline,
  subheadline,
  bg = "#FAF1F1",
  mockup,
}: Props) {
  return (
    <div
      className="w-full h-full flex flex-col items-center"
      style={{
        background: bg,
        fontFamily: "var(--font-fredoka), sans-serif",
      }}
    >
      {/* Text zone */}
      <div className="pt-[6%] px-[5%] text-center">
        {headline}
        {subheadline ? <div className="mt-[2%]">{subheadline}</div> : null}
      </div>

      {/* Device zone — fills the rest, avec air au-dessus */}
      <div className="flex-1 flex items-center justify-center w-full px-[3%] pt-[7%] pb-[4%] min-h-0">
        <div className="h-full">
          {mockup ?? (
            <DeviceFrame
              variant="iphone-15-pro"
              className="h-full w-auto !rounded-[7%] !p-[2%]"
              screenClassName="!rounded-[5%]"
            >
              <GameMockup />
            </DeviceFrame>
          )}
        </div>
      </div>
    </div>
  );
}
