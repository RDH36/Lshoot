#!/usr/bin/env node
// Landing page protection: refuse commits that modify the marketing landing
// (app/page.tsx, components/landing/, public/showcase/) without the developer
// code. See the "License & protection" section in the README.

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const PROTECTED_PATHS = ["app/page.tsx", "components/landing", "public/showcase"];
const LOCK_PATH = ".landing-lock";
const ENV_VAR = "SCREENSHOOT_DEV_CODE";
const DEV_CODE_HASH =
  // sha256("rdh36")
  "e715381335eef2038c2b011c6301829eb7e40f1185c9440fa2dcf548a6b3bc21";

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

function listFiles(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return [path];
  return readdirSync(path)
    .sort()
    .flatMap((name) => listFiles(join(path, name)));
}

function protectedHash() {
  const hash = createHash("sha256");
  for (const file of PROTECTED_PATHS.flatMap(listFiles)) {
    hash.update(file + "\0");
    hash.update(readFileSync(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function stagedProtectedFiles() {
  try {
    const out = execSync("git diff --cached --name-only", { encoding: "utf8" });
    return out
      .split("\n")
      .map((s) => s.trim())
      .filter((f) => PROTECTED_PATHS.some((p) => f === p || f.startsWith(p + "/")));
  } catch {
    return [];
  }
}

function main() {
  if (stagedProtectedFiles().length === 0) {
    process.exit(0);
  }

  if (!existsSync(LOCK_PATH)) {
    console.error(
      `\n⚠️  ${LOCK_PATH} is missing. Regenerate it with:\n  node scripts/check-landing.mjs --update\n`,
    );
    process.exit(1);
  }

  const currentHash = protectedHash();
  const lockedHash = readFileSync(LOCK_PATH, "utf8").trim();

  if (currentHash === lockedHash) {
    process.exit(0);
  }

  const code = process.env[ENV_VAR] ?? "";
  if (sha256(code) === DEV_CODE_HASH) {
    writeFileSync(LOCK_PATH, currentHash + "\n");
    execSync(`git add ${LOCK_PATH}`);
    console.log(
      `✓ Landing updated by developer. ${LOCK_PATH} refreshed and staged.`,
    );
    process.exit(0);
  }

  console.error(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Landing page protection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  The marketing landing has been modified:
    ${PROTECTED_PATHS.join("\n    ")}

  These paths are protected. To commit changes, set the developer
  code as an environment variable:

    ${ENV_VAR}=<code> git commit -m "..."

  Without the code, please revert your changes:

    git restore --staged ${PROTECTED_PATHS.join(" ")}
    git checkout -- ${PROTECTED_PATHS.join(" ")}

  You are free to modify any OTHER file in this repo.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
  process.exit(1);
}

if (process.argv.includes("--update")) {
  const newHash = protectedHash();
  writeFileSync(LOCK_PATH, newHash + "\n");
  console.log(`✓ ${LOCK_PATH} updated (${newHash.slice(0, 12)}…)`);
  process.exit(0);
}

main();
