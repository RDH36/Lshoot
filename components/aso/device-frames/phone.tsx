import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  screenClassName?: string;
};

// Rounded-card phone: thin bezel, hairline border, no notch. Corner radii use
// container-query units so they stay circular at any render size.
export function Phone({
  children,
  className = "",
  screenClassName = "",
}: Props) {
  return (
    <div className={`relative aspect-[9/19.5] @container ${className}`}>
      <div className="absolute inset-0 rounded-[10cqw] border-[0.5cqw] border-[#2B3138] bg-[#16191D] p-[3cqw] shadow-[0_8cqw_20cqw_-6cqw_rgba(0,0,0,0.7)]">
        <div
          className={`relative w-full h-full overflow-hidden rounded-[8cqw] bg-[#0B0D10] ${screenClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
