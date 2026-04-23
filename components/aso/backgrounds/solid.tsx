import type { ReactNode } from "react";

type Props = {
  color: string;
  children?: ReactNode;
};

export function SolidBackground({ color, children }: Props) {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ background: color }}
    >
      {children}
    </div>
  );
}
