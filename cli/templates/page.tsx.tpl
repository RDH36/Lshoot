import Link from "next/link";
import { listProjects } from "@/lib/project-loader";
import { ProjectsList } from "@/components/projects-list";
import { Nav, Footer } from "@/components/landing/chrome";
import { FONT, T } from "@/components/landing/theme";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Docs" },
];

export default async function HomePage() {
  const projects = await listProjects();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: T.paper, color: T.ink, fontFamily: FONT.body }}
    >
      <Nav links={NAV_LINKS} cta={{ href: "/dashboard", label: "Dashboard" }} />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ color: T.accent, fontFamily: FONT.mono }}
          >
            Your Lshoot instance
          </p>
          <h1
            className="mt-3 text-[2.4rem] sm:text-[3.2rem] font-extrabold leading-[1] tracking-[-0.025em]"
            style={{ fontFamily: FONT.display }}
          >
            ASO screenshots, written in code.
          </h1>
          <p className="mt-5 max-w-[34rem] text-[16px] leading-relaxed" style={{ color: T.muted }}>
            Every folder in <code style={{ fontFamily: FONT.mono }}>projects/</code> with a{" "}
            <code style={{ fontFamily: FONT.mono }}>config.json</code> shows up below.
            Open one to preview its screenshots and export every store format.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full px-6 h-11 text-[14px] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: T.accent, color: "#fff" }}
            >
              Read the docs <span aria-hidden>→</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full px-6 h-11 text-[14px] font-semibold border transition-colors hover:bg-black/[0.04]"
              style={{ borderColor: T.line, color: T.ink, background: "#fff" }}
            >
              Open dashboard
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-[13px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontFamily: FONT.mono }}>
              Projects · {projects.length}
            </h2>
            <span className="text-[12px]" style={{ color: T.muted }}>
              Add a folder in <code style={{ fontFamily: FONT.mono }}>projects/</code> to see it here
            </span>
          </div>
          <ProjectsList projects={projects} />
        </section>
      </main>
      <Footer tagline="your local instance" />
    </div>
  );
}
