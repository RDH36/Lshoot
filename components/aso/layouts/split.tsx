import type { ReactNode } from "react";

type Padding = "sm" | "md" | "lg";

const PADDING_CLASS: Record<Padding, string> = {
  sm: "p-[5%]",
  md: "p-[8%]",
  lg: "p-[12%]",
};

type Props = {
  text: ReactNode;
  mockup: ReactNode;
  reverse?: boolean;
  padding?: Padding;
  direction?: "horizontal" | "vertical";
};

export function SplitLayout({
  text,
  mockup,
  reverse = false,
  padding = "md",
  direction = "vertical",
}: Props) {
  const isHorizontal = direction === "horizontal";
  const flexDir = isHorizontal
    ? reverse
      ? "flex-row-reverse"
      : "flex-row"
    : reverse
      ? "flex-col-reverse"
      : "flex-col";

  return (
    <div
      className={`relative w-full h-full flex ${flexDir} items-center justify-center gap-[4%] ${PADDING_CLASS[padding]}`}
    >
      <div className="flex-1 flex flex-col items-center justify-center min-w-0 min-h-0">
        {text}
      </div>
      <div className="flex-1 flex items-center justify-center min-w-0 min-h-0">
        {mockup}
      </div>
    </div>
  );
}
