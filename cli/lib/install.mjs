import { run } from "./exec.mjs";

export async function runInstall(targetDir) {
  const start = Date.now();
  await run("pnpm", ["install"], { cwd: targetDir });
  return { success: true, durationMs: Date.now() - start };
}
