import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  screenClassName?: string;
};

export function AndroidPhone({
  children,
  className = "",
  screenClassName = "",
}: Props) {
  return (
    <div
      className={`relative aspect-[9/19.5] bg-neutral-800 rounded-[8%] p-[2%] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div
        className={`relative w-full h-full bg-white rounded-[6%] overflow-hidden ${screenClassName}`}
      >
        {children}
        <div className="absolute top-[2%] left-[50%] -translate-x-1/2 w-[3%] aspect-square bg-black rounded-full z-10" />
      </div>
    </div>
  );
}
