import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetUploader } from "@/components/asset-uploader";
import { getProject } from "@/lib/project-loader";

type Params = { project: string };

export default async function AssetsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { project: slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="container mx-auto py-12 px-6 max-w-4xl">
      <Link
        href={`/projects/${slug}`}
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Retour au projet
      </Link>
      <h1 className="text-3xl font-bold mt-2 mb-8">
        {project.config.name} — Assets
      </h1>

      <AssetUploader project={slug} />

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Assets existants ({project.assets.length})
        </h2>
        {project.assets.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun asset. Dépose des captures ci-dessus.
          </p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {project.assets.map((filename) => (
              <div
                key={filename}
                className="relative aspect-[9/19.5] rounded border overflow-hidden bg-neutral-100"
              >
                <Image
                  src={`/api/assets/${slug}/${filename}`}
                  alt={filename}
                  fill
                  unoptimized
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate font-mono">
                  {filename}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
