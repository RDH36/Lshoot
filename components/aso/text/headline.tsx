import type { ReactNode } from "react";

type Size = "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type Align = "left" | "center" | "right";

const SIZE_REM: Record<Size, string> = {
  xl: "4rem",
  "2xl": "5rem",
  "3xl": "6rem",
  "4xl": "8rem",
  "5xl": "10rem",
  "6xl": "12rem",
};

type Props = {
  children: ReactNode;
  color?: string;
  size?: Size;
  align?: Align;
  className?: string;
};

export function Headline({
  children,
  color = "#0f172a",
  size = "4xl",
  align = "center",
  className = "",
}: Props) {
  return (
    <h1
      className={`font-bold leading-[1.05] tracking-tight ${className}`}
      style={{ color, fontSize: SIZE_REM[size], textAlign: align }}
    >
      {children}
    </h1>
  );
}
