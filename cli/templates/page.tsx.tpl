import Link from "next/link";
import { listProjects } from "@/lib/project-loader";

const ACCENT = "#059669";

export default async function HomePage() {
  const projects = await listProjects();
  const hasProjects = projects.length > 0;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#fafaf9", color: "#1c1917" }}
    >
      <Nav projectCount={projects.length} />
      <main className="container mx-auto max-w-5xl px-6 py-16">
        <Hero hasProjects={hasProjects} />
        {hasProjects ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <EmptyState />
        )}
        <QuickLinks />
      </main>
      <Footer />
    </div>
  );
}

function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-label="Lshoot"
    >
      <rect width="32" height="32" rx="7" fill={ACCENT} />
      <path d="M10 8H14V20H20V24H10V8Z" fill="#ffffff" />
      <circle cx="23" cy="22" r="2.5" fill="#ffffff" />
    </svg>
  );
}

function Nav({ projectCount }: { projectCount: number }) {
  return (
    <header
      className="sticky top-0 z-20 backdrop-blur border-b"
      style={{
        background: "rgba(250, 250, 249, 0.85)",
        borderColor: "#e7e5e4",
      }}
    >
      <div className="container mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[15px]">
          <Logo />
          <span>Lshoot</span>
          <span
            className="ml-1 text-[11px] font-mono px-1.5 py-0.5 rounded"
            style={{ background: "#f5f5f4", color: "#78716c" }}
          >
            {projectCount} project{projectCount === 1 ? "" : "s"}
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-[13px]">
          <Link href="/docs" style={{ color: "#57534e" }}>
            Docs
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium"
            style={{ background: ACCENT, color: "#ffffff" }}
          >
            Open dashboard <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero({ hasProjects }: { hasProjects: boolean }) {
  return (
    <section className="text-center mb-16">
      <p
        className="text-[12px] uppercase tracking-[0.2em] font-medium"
        style={{ color: "#78716c" }}
      >
        Your Lshoot instance
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
        {hasProjects ? "Welcome back." : "Ready to ship your first app."}
      </h1>
      <p
        className="mt-4 text-base sm:text-lg max-w-xl mx-auto"
        style={{ color: "#57534e" }}
      >
        {hasProjects
          ? "Pick a project below to keep iterating on your store screenshots."
          : "Create a folder in projects/ with a config.json to get started, or read the docs for a guided walkthrough."}
      </p>
    </section>
  );
}

function ProjectsGrid({
  projects,
}: {
  projects: Awaited<ReturnType<typeof listProjects>>;
}) {
  return (
    <section className="mb-16">
      <h2
        className="text-[12px] uppercase tracking-[0.2em] font-medium mb-4"
        style={{ color: "#78716c" }}
      >
        Your projects
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-xl overflow-hidden border"
        style={{ borderColor: "#e7e5e4", background: "#e7e5e4" }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: Awaited<ReturnType<typeof listProjects>>[number];
}) {
  return (
    <div className="p-5" style={{ background: "#fafaf9" }}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-semibold text-[16px]">{project.config.name}</h3>
        <code
          className="text-[11px] font-mono px-1.5 py-0.5 rounded"
          style={{ background: "#f5f5f4", color: "#78716c" }}
        >
          {project.slug}
        </code>
      </div>
      <p className="mt-1 text-[12px]" style={{ color: "#78716c" }}>
        {project.config.bundleId}
      </p>
      <div className="mt-4 flex items-center gap-3 text-[13px]">
        <Link
          href={`/dashboard?slug=${project.slug}`}
          className="font-medium"
          style={{ color: ACCENT }}
        >
          Open →
        </Link>
        <Link
          href={`/preview/${project.slug}/01-hero`}
          target="_blank"
          style={{ color: "#57534e" }}
        >
          Preview
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <section
      className="text-center py-16 px-6 rounded-xl border mb-16"
      style={{ borderColor: "#e7e5e4", background: "#ffffff" }}
    >
      <p className="text-[14px] font-medium" style={{ color: "#1c1917" }}>
        No projects yet.
      </p>
      <p className="mt-2 text-[13px] max-w-md mx-auto" style={{ color: "#57534e" }}>
        Drop a folder in{" "}
        <code
          className="px-1.5 py-0.5 rounded font-mono text-[11px]"
          style={{ background: "#f5f5f4" }}
        >
          projects/
        </code>{" "}
        with a <code className="font-mono text-[11px]">config.json</code>, or follow the
        docs.
      </p>
      <Link
        href="/docs"
        className="inline-flex mt-5 items-center gap-2 rounded-lg px-5 h-10 text-[13px] font-medium"
        style={{ background: ACCENT, color: "#ffffff" }}
      >
        Read the docs <span aria-hidden>→</span>
      </Link>
    </section>
  );
}

function QuickLinks() {
  const items = [
    { href: "/dashboard", label: "Dashboard", desc: "Manage projects, export PNGs" },
    { href: "/docs", label: "Docs", desc: "Quickstart, components, patterns" },
    {
      href: "https://github.com/RDH36/Lshoot",
      label: "GitHub",
      desc: "Source, issues, contribute",
      external: true,
    },
  ];
  return (
    <section className="border-t pt-10" style={{ borderColor: "#e7e5e4" }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            {...(item.external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className="block p-4 rounded-lg border transition-colors"
            style={{ borderColor: "#e7e5e4", background: "#ffffff" }}
          >
            <div className="font-medium text-[14px]">{item.label}</div>
            <div className="mt-1 text-[12px]" style={{ color: "#78716c" }}>
              {item.desc}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="border-t mt-8"
      style={{ borderColor: "#e7e5e4", background: "#f5f5f4" }}
    >
      <div
        className="container mx-auto max-w-5xl px-6 py-6 flex items-center justify-between text-[12px]"
        style={{ color: "#78716c" }}
      >
        <div className="flex items-center gap-2">
          <Logo size={18} />
          <span>Your local Lshoot instance · runs on localhost:3000</span>
        </div>
        <Link href="/docs" className="hover:opacity-70">
          Help →
        </Link>
      </div>
    </footer>
  );
}
