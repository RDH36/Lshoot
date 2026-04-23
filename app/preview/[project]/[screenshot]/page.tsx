import { notFound } from "next/navigation";
import { ScreenshotCanvas } from "@/components/aso";
import { getProject } from "@/lib/project-loader";
import { getFormat } from "@/lib/formats";

type Params = { project: string; screenshot: string };

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ format?: string; lang?: string }>;
}) {
  const { project, screenshot } = await params;
  const { format, lang } = await searchParams;

  const proj = await getProject(project);
  if (!proj || !proj.screenshots.includes(screenshot)) notFound();

  const resolvedFormat =
    (format && getFormat(format)?.id) ?? "iphone-6.9";

  const mod = (await import(
    `@/projects/${project}/screenshots/${screenshot}.tsx`
  )) as { default: (props: { lang?: string }) => React.ReactNode };
  const Screenshot = mod.default;

  return (
    <ScreenshotCanvas format={resolvedFormat}>
      <Screenshot lang={lang} />
    </ScreenshotCanvas>
  );
}
