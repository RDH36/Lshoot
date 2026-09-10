import Link from "next/link";
import { BRAND, FONT, GITHUB_URL, T } from "./theme";

export type NavLink = { href: string; label: string };

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-label={`${BRAND} logo`}
    >
      <rect width="32" height="32" rx="7" fill={T.accent} />
      <path d="M10 8H14V20H20V24H10V8Z" fill="#ffffff" />
      <circle cx="23" cy="22" r="2.5" fill="#ffffff" />
    </svg>
  );
}

export function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.373.5 0 5.873 0 12.5c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.305.762-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016.002 0c2.292-1.552 3.298-1.23 3.298-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.48 5.921.43.371.814 1.102.814 2.222 0 1.604-.014 2.897-.014 3.29 0 .32.19.694.8.576C20.565 22.296 24 17.8 24 12.5 24 5.873 18.627.5 12 .5z" />
    </svg>
  );
}

export function Nav({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md border-b"
      style={{ background: "rgba(246, 244, 238, 0.82)", borderColor: T.line }}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span
            className="text-[17px] font-bold tracking-tight"
            style={{ fontFamily: FONT.display, color: T.ink }}
          >
            {BRAND}
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden md:inline-flex px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors hover:bg-black/[0.05]"
              style={{ color: T.muted }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors hover:bg-black/[0.05]"
            style={{ color: T.muted }}
            aria-label="GitHub"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <Link
            href={cta.href}
            className="ml-2 inline-flex items-center gap-1.5 rounded-full px-4 h-9 text-[13px] font-semibold transition-transform hover:-translate-y-px"
            style={{ background: T.ink, color: T.paper }}
          >
            {cta.label} <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

const FOOTER_LINKS: NavLink[] = [
  { href: "/docs", label: "Docs" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ tagline = "local-first ASO screenshots" }: { tagline?: string }) {
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.paper }}>
      <div
        className="mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center justify-between gap-5 text-[13px]"
        style={{ color: T.muted }}
      >
        <div className="flex items-center gap-2.5">
          <Logo size={20} />
          <span>
            <span className="font-semibold" style={{ color: T.ink }}>
              {BRAND}
            </span>{" "}
            · {tagline}
          </span>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 hover:opacity-70"
          >
            <GitHubIcon /> GitHub
          </a>
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:opacity-70">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
