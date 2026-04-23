import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  screenClassName?: string;
};

export function IPad13({
  children,
  className = "",
  screenClassName = "",
}: Props) {
  return (
    <div
      className={`relative aspect-[3/4] bg-neutral-900 rounded-[4%] p-[2.2%] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div
        className={`relative w-full h-full bg-white rounded-[2%] overflow-hidden ${screenClassName}`}
      >
        {children}
        <div className="absolute top-[1%] left-1/2 -translate-x-1/2 w-[1.2%] aspect-square bg-neutral-700 rounded-full z-10" />
      </div>
    </div>
  );
}
