#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const HELP = `\
Lshoot — set up your own Lshoot instance.

Usage:
  lshoot <directory>          Clone Lshoot into <directory> and customize it
  lshoot --help               Show this help
  lshoot --version            Show the CLI version

Examples:
  npx github:RDH36/Lshoot my-app
  node cli/index.mjs my-app
`;

async function getVersion() {
  for (const dir of [__dirname, resolve(__dirname, "..")]) {
    try {
      const pkg = JSON.parse(await readFile(resolve(dir, "package.json"), "utf8"));
      if (pkg.name === "lshoot" || pkg.name === "screenshoot-app") {
        return pkg.version ?? "0.0.0";
      }
    } catch {}
  }
  return "0.0.0";
}

async function main() {
  const args = process.argv.slice(2).filter((a) => a !== "init");

  if (args[0] === "--help" || args[0] === "-h") {
    process.stdout.write(HELP);
    process.exit(0);
  }

  if (args[0] === "--version" || args[0] === "-v") {
    process.stdout.write((await getVersion()) + "\n");
    process.exit(0);
  }

  const { default: init } = await import("./commands/init.mjs");
  await init(args[0]);
}

main().catch((err) => {
  process.stderr.write(`\n✗ ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
