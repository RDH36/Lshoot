import Link from "next/link";
import { listProjects } from "@/lib/project-loader";
import { ProjectsList } from "@/components/projects-list";

export default async function DashboardPage() {
  const projects = await listProjects();

  return (
    <div
      className="min-h-screen"
      style={{ background: "#fafaf9", color: "#1c1917" }}
    >
      <main className="container mx-auto py-12 px-6 max-w-5xl">
        <header className="mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Link
              href="/"
              className="text-sm hover:underline"
              style={{ color: "#78716c" }}
            >
              ← Home
            </Link>
            <h1 className="text-4xl font-bold tracking-tight mt-2">Dashboard</h1>
            <p className="mt-2" style={{ color: "#57534e" }}>
              {projects.length} project{projects.length > 1 ? "s" : ""} found in{" "}
              <code
                className="px-1 py-0.5 rounded text-sm font-mono"
                style={{ background: "#f5f5f4" }}
              >
                projects/
              </code>
            </p>
          </div>
          <Link
            href="/docs"
            className="text-sm hover:underline mt-2"
            style={{ color: "#059669" }}
          >
            Documentation →
          </Link>
        </header>

        <ProjectsList projects={projects} />
      </main>
    </div>
  );
}
