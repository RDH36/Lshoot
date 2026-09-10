// Lshoot's own ASO screen — Taxico-style: rounded phone filling the canvas,
// emerald ribbon at the bottom carrying a big white uppercase headline.
import type { ReactNode } from "react";
import { DeviceFrame } from "@/components/aso";

type Props = {
  headline: ReactNode;
  screen: ReactNode;
};

const INK = "#15161A";
const EMERALD = "#059669";

export function LshootLayout({ headline, screen }: Props) {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: INK, fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 2px, transparent 2px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[14%] h-[50%] w-[85%] -translate-x-1/2 rounded-full"
        style={{ background: EMERALD, opacity: 0.22, filter: "blur(140px)" }}
      />

      <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-[2.5%]">
        <DeviceFrame variant="phone" className="w-[97%]">
          {screen}
        </DeviceFrame>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-20 h-[16%] flex items-center justify-center px-[4%]"
        style={{ background: "linear-gradient(180deg, #10B981 0%, #047857 100%)" }}
      >
        <h2
          className="text-center font-extrabold uppercase leading-[0.92] tracking-[-0.025em] text-[7.4rem] text-white"
          style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
        >
          {headline}
        </h2>
      </div>
    </div>
  );
}
