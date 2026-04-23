import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);
const SAFE_SEGMENT = /^[a-zA-Z0-9._-]+$/;

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  const project = form.get("project");

  if (!(file instanceof File) || typeof project !== "string") {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return Response.json(
      { error: `File too large (max ${MAX_SIZE / 1024 / 1024} MB)` },
      { status: 413 },
    );
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return Response.json(
      { error: `MIME not allowed (${file.type || "unknown"})` },
      { status: 415 },
    );
  }

  const filename = file.name.replace(/\s+/g, "-");
  if (!SAFE_SEGMENT.test(filename) || !SAFE_SEGMENT.test(project)) {
    return Response.json(
      { error: "Unsafe filename or project slug" },
      { status: 400 },
    );
  }

  const dir = path.join(process.cwd(), "projects", project, "assets");
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  revalidatePath(`/projects/${project}/assets`);
  revalidatePath(`/projects/${project}`);

  return Response.json({ ok: true, filename });
}
