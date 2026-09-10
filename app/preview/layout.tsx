import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center">
      {children}
    </div>
  );
}
