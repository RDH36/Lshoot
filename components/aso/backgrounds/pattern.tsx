import type { ReactNode } from "react";

type Pattern = "dots" | "grid" | "waves";

type Props = {
  pattern: Pattern;
  color?: string;
  bgColor?: string;
  size?: number;
  opacity?: number;
  children?: ReactNode;
};

export function PatternBackground({
  pattern,
  color = "#000000",
  bgColor = "#ffffff",
  size = 40,
  opacity = 0.15,
  children,
}: Props) {
  const fgRgba = hexToRgba(color, opacity);
  const style = buildStyle(pattern, fgRgba, bgColor, size);
  return (
    <div className="absolute inset-0 w-full h-full" style={style}>
      {children}
    </div>
  );
}

function buildStyle(
  pattern: Pattern,
  color: string,
  bg: string,
  size: number,
): React.CSSProperties {
  if (pattern === "dots") {
    return {
      background: bg,
      backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px)`,
      backgroundSize: `${size}px ${size}px`,
    };
  }
  if (pattern === "grid") {
    return {
      background: bg,
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    };
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size * 2}' height='${size}' viewBox='0 0 ${size * 2} ${size}'><path d='M0 ${size / 2} Q ${size / 2} 0 ${size} ${size / 2} T ${size * 2} ${size / 2}' fill='none' stroke='${color}' stroke-width='2'/></svg>`;
  return {
    background: bg,
    backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
    backgroundSize: `${size * 2}px ${size}px`,
  };
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
