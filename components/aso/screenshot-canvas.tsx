import type { CSSProperties, ReactNode } from "react";
import { FORMATS, getFormat } from "@/lib/formats";

type Props = {
  format?: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

export function ScreenshotCanvas({
  format = "iphone-6.9",
  children,
  style,
  className = "",
}: Props) {
  const spec = getFormat(format) ?? FORMATS[0];
  return (
    <div
      data-screenshot-canvas
      data-format={spec.id}
      style={{ width: spec.width, height: spec.height, ...style }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
