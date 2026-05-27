import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { run } from "./exec.mjs";

export async function cloneRepo({ repoUrl, targetDir, branch = "main" }) {
  const absTarget = resolve(targetDir);

  if (existsSync(absTarget)) {
    throw new Error(
      `Target directory already exists: ${absTarget}\n` +
        `  Choose another name or remove it first.`,
    );
  }

  try {
    await run("git", [
      "clone",
      "--depth",
      "1",
      "--branch",
      branch,
      repoUrl,
      absTarget,
    ]);
  } catch (err) {
    if (existsSync(absTarget)) {
      await rm(absTarget, { recursive: true, force: true }).catch(() => {});
    }
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`git clone failed: ${msg}`);
  }

  return absTarget;
}
