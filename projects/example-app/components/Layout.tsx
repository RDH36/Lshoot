// Shared layout for example-app screens with a device.
// Consistent proportions: headline top ~20%, device ~60%, breathing bottom ~10%.
// Accepts a `background` node and an optional `glow` color rendered behind the device.

import type { ReactNode } from "react";

type Props = {
  headline: ReactNode;
  subheadline?: ReactNode;
  mockup?: ReactNode;
  background?: ReactNode;
  textColor?: string;
  glow?: string;
};

export const EXAMPLE_FONT = "var(--font-plus-jakarta), sans-serif";

export function ExampleLayout({
  headline,
  subheadline,
  mockup,
  background,
  textColor = "#0a0a0a",
  glow,
}: Props) {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ color: textColor, fontFamily: EXAMPLE_FONT }}
    >
      {background}
      {glow ? (
        <div
          aria-hidden
          className="absolute left-1/2 top-[45%] h-[45%] w-[90%] -translate-x-1/2 rounded-full"
          style={{ background: glow, opacity: 0.35, filter: "blur(160px)" }}
        />
      ) : null}
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        <div className="pt-[9%] px-[7%] text-center w-full">
          {headline}
          {subheadline ? <div className="mt-[3%]">{subheadline}</div> : null}
        </div>

        <div className="flex-1 flex items-center justify-center w-full px-[8%] pt-[7%] pb-[9%] min-h-0">
          {mockup ? (
            <div className="h-full flex items-center justify-center">
              {mockup}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
