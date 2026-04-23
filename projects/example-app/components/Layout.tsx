// Shared layout for example-app screens with a device.
// Consistent proportions: headline top ~20%, device ~60%, breathing bottom ~10%.
// Accepts a `background` node (GradientBackground/SolidBackground/PatternBackground).

import type { ReactNode } from "react";

type Props = {
  headline: ReactNode;
  subheadline?: ReactNode;
  mockup?: ReactNode;
  background?: ReactNode;
  textColor?: string;
};

export function ExampleLayout({
  headline,
  subheadline,
  mockup,
  background,
  textColor = "#0a0a0a",
}: Props) {
  return (
    <div
      className="w-full h-full relative"
      style={{
        color: textColor,
        fontFamily: "var(--font-roboto), sans-serif",
      }}
    >
      {background}
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        {/* Text zone — fixed top padding */}
        <div className="pt-[9%] px-[7%] text-center w-full">
          {headline}
          {subheadline ? <div className="mt-[3%]">{subheadline}</div> : null}
        </div>

        {/* Device zone — centered with breathing padding */}
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
