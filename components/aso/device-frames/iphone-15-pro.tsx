import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  screenClassName?: string;
};

export function IPhone15Pro({
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
        <div className="absolute top-[1.3%] left-1/2 -translate-x-1/2 w-[30%] h-[3.2%] bg-black rounded-full z-10" />
      </div>
    </div>
  );
}
