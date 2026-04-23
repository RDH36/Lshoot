import { readFile } from "node:fs/promises";
import path from "node:path";

const SAFE_SEGMENT = /^[a-zA-Z0-9._-]+$/;

const MIME_BY_EXT: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

type Params = { project: string; filename: string };

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  const { project, filename } = await params;

  if (!SAFE_SEGMENT.test(project) || !SAFE_SEGMENT.test(filename)) {
    return new Response("Bad request", { status: 400 });
  }

  const ext = path.extname(filename).slice(1).toLowerCase();
  const contentType = MIME_BY_EXT[ext];
  if (!contentType) {
    return new Response("Unsupported media type", { status: 415 });
  }

  const filePath = path.join(
    process.cwd(),
    "projects",
    project,
    "assets",
    filename,
  );

  try {
    const file = await readFile(filePath);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
