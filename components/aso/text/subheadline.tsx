import type { ReactNode } from "react";

type Size = "sm" | "md" | "lg" | "xl";
type Align = "left" | "center" | "right";

const SIZE_REM: Record<Size, string> = {
  sm: "2.25rem",
  md: "3rem",
  lg: "3.75rem",
  xl: "4.5rem",
};

type Props = {
  children: ReactNode;
  color?: string;
  size?: Size;
  align?: Align;
  className?: string;
};

export function Subheadline({
  children,
  color = "#475569",
  size = "md",
  align = "center",
  className = "",
}: Props) {
  return (
    <p
      className={`font-medium leading-snug ${className}`}
      style={{ color, fontSize: SIZE_REM[size], textAlign: align }}
    >
      {children}
    </p>
  );
}
