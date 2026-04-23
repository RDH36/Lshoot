import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { ProjectConfigSchema, type ProjectConfig } from "@/lib/schemas";

const PROJECTS_DIR = path.join(process.cwd(), "projects");

export type Project = {
  slug: string;
  config: ProjectConfig;
  screenshots: string[];
  assets: string[];
};

const SCREENSHOT_EXT = /\.tsx$/;
const ASSET_EXT = /\.(png|jpe?g|webp)$/i;

async function readConfig(slug: string): Promise<ProjectConfig> {
  const raw = await readFile(
    path.join(PROJECTS_DIR, slug, "config.json"),
    "utf8",
  );
  const parsed = ProjectConfigSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error(
      `Invalid config.json for project "${slug}": ${parsed.error.message}`,
    );
  }
  return parsed.data;
}

async function readDirSafe(dir: string): Promise<string[]> {
  try {
    return await readdir(dir);
  } catch {
    return [];
  }
}

export async function listScreenshots(slug: string): Promise<string[]> {
  const files = await readDirSafe(
    path.join(PROJECTS_DIR, slug, "screenshots"),
  );
  return files
    .filter((f) => SCREENSHOT_EXT.test(f))
    .map((f) => f.replace(SCREENSHOT_EXT, ""))
    .sort();
}

export async function listAssets(slug: string): Promise<string[]> {
  const files = await readDirSafe(path.join(PROJECTS_DIR, slug, "assets"));
  return files.filter((f) => ASSET_EXT.test(f)).sort();
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const [config, screenshots, assets] = await Promise.all([
      readConfig(slug),
      listScreenshots(slug),
      listAssets(slug),
    ]);
    return { slug, config, screenshots, assets };
  } catch (err) {
    if (
      err instanceof Error &&
      "code" in err &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null;
    }
    throw err;
  }
}

export async function listProjects(): Promise<Project[]> {
  const entries = await readDirSafe(PROJECTS_DIR);
  const projects = await Promise.all(
    entries
      .filter((name) => !name.startsWith(".") && !name.startsWith("_"))
      .map((slug) => getProject(slug)),
  );
  return projects.filter((p): p is Project => p !== null);
}
