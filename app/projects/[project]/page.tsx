import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ExportButton } from "@/components/export-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ScreenshotCard } from "@/components/screenshot-card";
import { getProject } from "@/lib/project-loader";

type Params = { project: string };

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { project: slug } = await params;
  const { lang } = await searchParams;
  const project = await getProject(slug);
  if (!project) notFound();

  const languages = project.config.languages ?? [];
  const activeLang =
    lang && languages.includes(lang) ? lang : languages[0] ?? "";

  return (
    <main className="container mx-auto py-12 px-6 max-w-6xl">
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← All projects
          </Link>
          <h1 className="text-3xl font-bold mt-2">{project.config.name}</h1>
          <p className="font-mono text-sm text-muted-foreground">
            {project.config.bundleId}
          </p>
        </div>
        <div className="flex gap-2 items-start flex-wrap">
          {languages.length > 1 ? (
            <LanguageSwitcher languages={languages} current={activeLang} />
          ) : null}
          <Link
            href={`/projects/${slug}/assets`}
            className={buttonVariants({ variant: "outline" })}
          >
            Assets ({project.assets.length})
          </Link>
          <ExportButton
            project={slug}
            screenshots={project.screenshots}
            languages={languages.length > 0 ? languages : undefined}
            isProtected={project.config.protected ?? false}
          />
        </div>
      </div>

      {project.screenshots.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Aucun screenshot. Demande à Claude Code d&apos;en créer dans{" "}
            <code className="bg-muted px-1 py-0.5 rounded">
              projects/{slug}/screenshots/
            </code>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {project.screenshots.map((s) => (
            <ScreenshotCard
              key={`${s}-${activeLang}`}
              project={slug}
              screenshot={s}
              lang={activeLang || undefined}
            />
          ))}
        </div>
      )}
    </main>
  );
}
