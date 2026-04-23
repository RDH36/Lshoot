#!/usr/bin/env node
// Landing page protection : refuse les commits qui modifient app/page.tsx
// sans code développeur. Voir LICENSE section dans le README.

import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const LANDING_PATH = "app/page.tsx";
const LOCK_PATH = ".landing-lock";
const ENV_VAR = "SCREENSHOOT_DEV_CODE";
const DEV_CODE_HASH =
  // sha256("rdh36")
  "e715381335eef2038c2b011c6301829eb7e40f1185c9440fa2dcf548a6b3bc21";

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

function fileHash(path) {
  return sha256(readFileSync(path));
}

function isStaged(path) {
  try {
    const out = execSync("git diff --cached --name-only", { encoding: "utf8" });
    return out
      .split("\n")
      .map((s) => s.trim())
      .includes(path);
  } catch {
    return false;
  }
}

function main() {
  if (!isStaged(LANDING_PATH)) {
    process.exit(0);
  }

  if (!existsSync(LOCK_PATH)) {
    console.error(
      `\n⚠️  ${LOCK_PATH} is missing. Regenerate it with:\n  node scripts/check-landing.mjs --update\n`,
    );
    process.exit(1);
  }

  const currentHash = fileHash(LANDING_PATH);
  const lockedHash = readFileSync(LOCK_PATH, "utf8").trim();

  if (currentHash === lockedHash) {
    process.exit(0);
  }

  const code = process.env[ENV_VAR] ?? "";
  if (sha256(code) === DEV_CODE_HASH) {
    // Auto-update the lock so subsequent commits work without re-entering the code
    writeFileSync(LOCK_PATH, currentHash + "\n");
    execSync(`git add ${LOCK_PATH}`);
    console.log(
      `✓ Landing page updated by developer. ${LOCK_PATH} refreshed and staged.`,
    );
    process.exit(0);
  }

  console.error(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Landing page protection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${LANDING_PATH} has been modified.

  This file is protected. To commit changes, set the developer
  code as an environment variable:

    ${ENV_VAR}=<code> git commit -m "..."

  Without the code, please revert your changes to ${LANDING_PATH}:

    git restore --staged ${LANDING_PATH}
    git checkout -- ${LANDING_PATH}

  You are free to modify any OTHER file in this repo.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
  process.exit(1);
}

if (process.argv.includes("--update")) {
  const newHash = fileHash(LANDING_PATH);
  writeFileSync(LOCK_PATH, newHash + "\n");
  console.log(`✓ ${LOCK_PATH} updated (${newHash.slice(0, 12)}…)`);
  process.exit(0);
}

main();
