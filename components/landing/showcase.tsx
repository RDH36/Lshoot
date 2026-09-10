import Image from "next/image";
import { FONT, SHOWCASE, T } from "./theme";

export function Showcase() {
  const track = [...SHOWCASE, ...SHOWCASE];
  return (
    <section id="showcase" className="relative overflow-hidden py-20 lg:py-24" style={{ background: T.ink2 }}>
      <div className="mx-auto max-w-6xl px-6 flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: T.accentBright, fontFamily: FONT.mono }}>
            Real exports
          </p>
          <h2
            className="mt-3 text-[2rem] sm:text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.02em]"
            style={{ fontFamily: FONT.display, color: "#F6F4EE" }}
          >
            Four apps. Every format.
            <br />
            Rendered by code, not by hand.
          </h2>
        </div>
        <p className="max-w-[22rem] text-[14px] leading-relaxed" style={{ color: "#9A9EA8" }}>
          Straight out of <span style={{ fontFamily: FONT.mono, color: "#D6DEEB" }}>exports/</span>.
          Chromium at 2× DPR, downsampled with Lanczos3 by Sharp. A game, a habit
          tracker, a finance app, a wellness app — same pipeline.
        </p>
      </div>

      <div className="group relative">
        <div aria-hidden className="absolute inset-y-0 left-0 w-24 z-10" style={{ background: `linear-gradient(to right, ${T.ink2}, transparent)` }} />
        <div aria-hidden className="absolute inset-y-0 right-0 w-24 z-10" style={{ background: `linear-gradient(to left, ${T.ink2}, transparent)` }} />
        <div className="lshoot-marquee flex w-max gap-5 pl-5 group-hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <figure key={`${item.src}-${i}`} className="shrink-0">
              <div className="rounded-[1.4rem] overflow-hidden ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-2">
                <Image
                  src={item.src}
                  alt={`${item.app} screenshot`}
                  width={item.width}
                  height={item.height}
                  sizes="16rem"
                  className="block h-[24rem] sm:h-[28rem] w-auto"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-[11px]" style={{ fontFamily: FONT.mono, color: "#8B8F98" }}>
                <span style={{ color: "#D6DEEB" }}>{item.app}</span>
                <span>{item.format}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
