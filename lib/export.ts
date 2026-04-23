import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { FORMATS, type ScreenshotFormat } from "@/lib/formats";
import { getProject } from "@/lib/project-loader";
import { captureScreenshot } from "@/lib/puppeteer";

export type ExportProgress =
  | { type: "start"; total: number; project: string }
  | {
      type: "screenshot";
      current: number;
      total: number;
      screenshot: string;
      format: string;
    }
  | { type: "done"; outputDir: string; count: number }
  | {
      type: "error";
      error: string;
      screenshot?: string;
      format?: string;
    };

export type ExportOptions = {
  formats?: ScreenshotFormat[];
  baseUrl?: string;
  lang?: string;
  screenshotIds?: string[];
  onProgress?: (progress: ExportProgress) => void;
};

export type ExportResult = {
  outputDir: string;
  count: number;
  errors: number;
};

export async function exportProject(
  slug: string,
  opts: ExportOptions = {},
): Promise<ExportResult> {
  const {
    formats = FORMATS,
    baseUrl = process.env.EXPORT_BASE_URL ?? "http://localhost:3000",
    lang,
    screenshotIds,
    onProgress = () => {},
  } = opts;

  const project = await getProject(slug);
  if (!project) throw new Error(`Project "${slug}" not found`);

  const screenshots =
    screenshotIds && screenshotIds.length > 0
      ? project.screenshots.filter((s) => screenshotIds.includes(s))
      : project.screenshots;

  const outputDir = lang
    ? path.join(process.cwd(), "exports", slug, lang)
    : path.join(process.cwd(), "exports", slug);
  const total = screenshots.length * formats.length;
  let current = 0;
  let errors = 0;

  onProgress({ type: "start", total, project: slug });

  for (const screenshot of screenshots) {
    for (const format of formats) {
      current++;
      onProgress({
        type: "screenshot",
        current,
        total,
        screenshot,
        format: format.id,
      });

      try {
        const langParam = lang ? `&lang=${lang}` : "";
        const url = `${baseUrl}/preview/${slug}/${screenshot}?format=${format.id}${langParam}`;
        // Capture à 2x DPR pour un rendu net, downscale ensuite via Sharp (Lanczos3).
        const rawPng = await captureScreenshot(url, {
          width: format.width,
          height: format.height,
          deviceScaleFactor: 2,
        });

        const finalPng = await sharp(rawPng)
          .resize(format.width, format.height, {
            fit: "fill",
            kernel: "lanczos3",
          })
          .png({
            compressionLevel: 6,
            adaptiveFiltering: true,
            palette: false,
          })
          .toBuffer();

        const dir = path.join(outputDir, format.store, format.id);
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, `${screenshot}.png`), finalPng);
      } catch (err) {
        errors++;
        onProgress({
          type: "error",
          error: err instanceof Error ? err.message : String(err),
          screenshot,
          format: format.id,
        });
      }
    }
  }

  onProgress({ type: "done", outputDir, count: current });
  return { outputDir, count: current, errors };
}
