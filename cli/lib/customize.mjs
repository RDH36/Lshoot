import { existsSync } from "node:fs";
import { copyFile, rm, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const CLEANUP_FILES = [
  ".landing-lock",
  "scripts/check-landing.mjs",
  ".husky/pre-commit",
];

export async function customizeClone(targetDir, { templatesDir }) {
  const changes = { replaced: [], removed: [] };

  await rm(join(targetDir, ".git"), { recursive: true, force: true });
  changes.removed.push(".git");

  const landingSrc = join(templatesDir, "page.tsx.tpl");
  const landingDest = join(targetDir, "app", "page.tsx");
  if (!existsSync(landingSrc)) {
    throw new Error(`Template not found: ${landingSrc}`);
  }
  await copyFile(landingSrc, landingDest);
  changes.replaced.push("app/page.tsx");

  for (const rel of CLEANUP_FILES) {
    const abs = join(targetDir, rel);
    if (existsSync(abs)) {
      await rm(abs, { force: true });
      changes.removed.push(rel);
    }
  }

  await stripPrepareScript(targetDir);

  return changes;
}

async function stripPrepareScript(targetDir) {
  const pkgPath = join(targetDir, "package.json");
  if (!existsSync(pkgPath)) return;
  const raw = await readFile(pkgPath, "utf8");
  const pkg = JSON.parse(raw);
  if (pkg.scripts?.prepare === "husky") {
    delete pkg.scripts.prepare;
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  }
}
