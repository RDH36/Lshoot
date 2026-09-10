import Link from "next/link";
import { GitHubIcon } from "./chrome";
import { FONT, GITHUB_URL, INSTALL_CMD, NPM_URL, T } from "./theme";

export function CTA() {
  return (
    <section style={{ background: T.paper2 }}>
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div
          className="relative overflow-hidden rounded-[2rem] px-8 py-16 sm:px-14 sm:py-20 text-center"
          style={{ background: T.ink2 }}
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/3 rounded-full"
            style={{ background: T.accent, opacity: 0.22, filter: "blur(120px)" }}
          />
          <div className="relative">
            <h2
              className="text-[2.2rem] sm:text-[3.2rem] font-extrabold leading-[1] tracking-[-0.03em]"
              style={{ fontFamily: FONT.display, color: "#F6F4EE" }}
            >
              Own your instance
              <br />
              in one command.
            </h2>
            <p className="mt-5 max-w-[30rem] mx-auto text-[15px] leading-relaxed" style={{ color: "#9A9EA8" }}>
              The CLI clones Lshoot, gives you a personal dashboard as home page and
              wipes the upstream history. The repo is yours from the first commit.
            </p>
            <div
              className="mt-9 inline-flex items-center gap-4 rounded-xl border border-white/10 px-6 py-4 text-[16px] sm:text-[20px]"
              style={{ background: "#0B0C0F", color: "#E7E4DC", fontFamily: FONT.mono }}
            >
              <span style={{ color: T.accentBright }}>$</span>
              {INSTALL_CMD}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-full px-6 h-11 text-[14px] font-semibold transition-transform hover:-translate-y-0.5"
                style={{ background: T.accent, color: "#fff" }}
              >
                Read the docs <span aria-hidden>→</span>
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full px-6 h-11 text-[14px] font-semibold border border-white/15 transition-colors hover:bg-white/[0.06]"
                style={{ color: "#F6F4EE" }}
              >
                <GitHubIcon /> GitHub
              </a>
              <a
                href={NPM_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center px-3 h-11 text-[13px] hover:opacity-80"
                style={{ color: "#9A9EA8", fontFamily: FONT.mono }}
              >
                npm/lshoot
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
