import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { banner, success, error, info, step, dim, code, path as fmtPath, blank, colors } from "../lib/ui.mjs";
import { confirm } from "../lib/prompts.mjs";
import { checkNode, checkGit, checkPnpm } from "../lib/checks.mjs";
import { cloneRepo } from "../lib/clone.mjs";
import { customizeClone } from "../lib/customize.mjs";
import { runInstall } from "../lib/install.mjs";

const REPO_URL = "https://github.com/RDH36/Lshoot.git";
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = resolve(__dirname, "..", "templates");

const DIR_NAME_RE = /^[a-z0-9][a-z0-9._-]*$/i;

export default async function init(targetDir) {
  banner("Lshoot setup", "Clone the repo, replace the landing, install deps.");

  validateTargetName(targetDir);
  const absTarget = resolve(targetDir);

  if (existsSync(absTarget)) {
    error(`Directory already exists: ${fmtPath(absTarget)}`);
    process.exit(1);
  }

  step("Checking environment");
  checkNode();
  success(`Node ${process.versions.node}`);

  const git = await checkGit();
  if (!git.installed) {
    error("Git is not installed.");
    dim("  " + git.remedy);
    process.exit(1);
  }
  success(`Git ${git.version}`);

  const pnpm = await checkPnpm();
  if (pnpm.installed) {
    success(`pnpm ${pnpm.version}`);
  } else {
    info("pnpm not found (optional — required to run the dev server later).");
    dim("  " + pnpm.remedy);
  }

  let cleanupPath = null;
  try {
    step(`Cloning ${REPO_URL}`);
    cleanupPath = await cloneRepo({ repoUrl: REPO_URL, targetDir: absTarget });
    success(`Cloned into ${fmtPath(targetDir)}`);

    step("Customizing your instance");
    const changes = await customizeClone(absTarget, { templatesDir: TEMPLATES_DIR });
    success(`Replaced ${changes.replaced.join(", ")}`);
    if (changes.removed.length) {
      dim(`  Removed: ${changes.removed.join(", ")}`);
    }

    if (pnpm.installed) {
      blank();
      const wantInstall = await confirm({
        message: "Install dependencies now? (pnpm install)",
        defaultValue: true,
      });
      if (wantInstall) {
        step("Installing dependencies");
        const result = await runInstall(absTarget);
        success(`Done in ${(result.durationMs / 1000).toFixed(1)}s`);
      }
    }

    printNextSteps(targetDir, pnpm.installed);
  } catch (err) {
    error(err instanceof Error ? err.message : String(err));
    if (cleanupPath && existsSync(cleanupPath)) {
      const drop = await confirm({
        message: `Remove partial clone at ${cleanupPath}?`,
        defaultValue: true,
      }).catch(() => true);
      if (drop) {
        await rm(cleanupPath, { recursive: true, force: true }).catch(() => {});
        info("Cleaned up.");
      }
    }
    process.exit(1);
  }
}

function validateTargetName(name) {
  if (!name) {
    error("Missing target directory.");
    dim("  Usage: lshoot <directory>");
    process.exit(1);
  }
  const base = basename(name);
  if (!DIR_NAME_RE.test(base)) {
    error(`Invalid directory name: ${base}`);
    dim("  Use letters, digits, dot, underscore or dash. Must start with a letter or digit.");
    process.exit(1);
  }
}

function printNextSteps(targetDir, pnpmInstalled) {
  blank();
  banner("You're all set", "Next steps");
  process.stdout.write(`  ${code(`cd ${targetDir}`)}\n`);
  if (!pnpmInstalled) {
    process.stdout.write(`  ${code("corepack enable")}     ${colors.dim("# enable pnpm")}\n`);
    process.stdout.write(`  ${code("pnpm install")}\n`);
  } else {
    process.stdout.write(`  ${code("pnpm install")}        ${colors.dim("# if you skipped above")}\n`);
  }
  process.stdout.write(`  ${code("pnpm dev")}            ${colors.dim("# open http://localhost:3000")}\n`);
  blank();
  dim("Docs: http://localhost:3000/docs once dev is running.");
  blank();
}
