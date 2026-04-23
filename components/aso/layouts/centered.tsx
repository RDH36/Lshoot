import type { ReactNode } from "react";

type Padding = "sm" | "md" | "lg";

const PADDING_CLASS: Record<Padding, string> = {
  sm: "p-[5%]",
  md: "p-[8%]",
  lg: "p-[12%]",
};

type Props = {
  headline?: ReactNode;
  subheadline?: ReactNode;
  mockup: ReactNode;
  padding?: Padding;
  textPosition?: "top" | "bottom";
  gap?: string;
};

export function CenteredLayout({
  headline,
  subheadline,
  mockup,
  padding = "md",
  textPosition = "top",
  gap = "4%",
}: Props) {
  const textBlock = (
    <div className="flex flex-col items-center" style={{ gap }}>
      {headline}
      {subheadline}
    </div>
  );

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-between ${PADDING_CLASS[padding]}`}
    >
      {textPosition === "top" ? textBlock : null}
      <div className="flex-1 flex items-center justify-center w-full min-h-0">
        {mockup}
      </div>
      {textPosition === "bottom" ? textBlock : null}
    </div>
  );
}
