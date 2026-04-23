import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  screenClassName?: string;
};

export function IPhone15({
  children,
  className = "",
  screenClassName = "",
}: Props) {
  return (
    <div
      className={`relative aspect-[9/19.5] bg-black rounded-[12%] p-[3%] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div
        className={`relative w-full h-full bg-white rounded-[9%] overflow-hidden ${screenClassName}`}
      >
        {children}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[3.8%] bg-black rounded-b-[20%] z-10" />
      </div>
    </div>
  );
}
