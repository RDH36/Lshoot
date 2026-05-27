import { tryRun } from "./exec.mjs";

const MIN_NODE_MAJOR = 20;

export function checkNode() {
  const [major] = process.versions.node.split(".").map(Number);
  if (major < MIN_NODE_MAJOR) {
    throw new Error(
      `Node.js ${MIN_NODE_MAJOR}+ is required (you have ${process.versions.node}). ` +
        `Install from https://nodejs.org or use nvm: 'nvm install ${MIN_NODE_MAJOR}'.`,
    );
  }
  return process.versions.node;
}

export async function checkGit() {
  const result = await tryRun("git", ["--version"]);
  if (result.code !== 0) {
    return {
      installed: false,
      remedy:
        "Install Git from https://git-scm.com or your package manager (e.g. 'brew install git', 'sudo apt install git').",
    };
  }
  const version = result.stdout.trim().replace(/^git version\s*/, "");
  return { installed: true, version };
}

export async function checkPnpm() {
  const result = await tryRun("pnpm", ["--version"]);
  if (result.code !== 0) {
    return {
      installed: false,
      remedy:
        "Enable pnpm via corepack (ships with Node 20+):\n    corepack enable\n    corepack prepare pnpm@latest --activate",
    };
  }
  return { installed: true, version: result.stdout.trim() };
}
