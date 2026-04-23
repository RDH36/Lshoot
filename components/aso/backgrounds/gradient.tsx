import type { ReactNode } from "react";

type Direction = "to-b" | "to-t" | "to-br" | "to-bl" | "to-r" | "to-l";

const CSS_DIRECTION: Record<Direction, string> = {
  "to-b": "to bottom",
  "to-t": "to top",
  "to-br": "to bottom right",
  "to-bl": "to bottom left",
  "to-r": "to right",
  "to-l": "to left",
};

type Props = {
  from: string;
  to: string;
  via?: string;
  direction?: Direction;
  children?: ReactNode;
};

export function GradientBackground({
  from,
  to,
  via,
  direction = "to-b",
  children,
}: Props) {
  const stops = via ? `${from}, ${via}, ${to}` : `${from}, ${to}`;
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ background: `linear-gradient(${CSS_DIRECTION[direction]}, ${stops})` }}
    >
      {children}
    </div>
  );
}
