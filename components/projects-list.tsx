import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/project-loader";

export function ProjectsList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground mb-2">
          Aucun projet pour l&apos;instant.
        </p>
        <p className="text-sm text-muted-foreground">
          Crée un dossier dans{" "}
          <code className="bg-muted px-1 py-0.5 rounded">projects/</code> avec
          un <code className="bg-muted px-1 py-0.5 rounded">config.json</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((p) => (
        <Link key={p.slug} href={`/projects/${p.slug}`} className="block">
          <Card className="h-full hover:border-foreground/30 transition-colors">
            <CardHeader>
              <CardTitle>{p.config.name}</CardTitle>
              <CardDescription className="font-mono text-xs">
                {p.config.bundleId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {p.screenshots.length} screenshot
                {p.screenshots.length > 1 ? "s" : ""} · {p.assets.length} asset
                {p.assets.length > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
