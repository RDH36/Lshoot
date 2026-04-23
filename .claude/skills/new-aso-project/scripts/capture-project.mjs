#!/usr/bin/env node
// Capture all screens of a project and compose a grid for visual layout verification.
// Usage: node .claude/skills/new-aso-project/scripts/capture-project.mjs <slug> [lang]
//
// Requires:
//   - `pnpm dev` running on localhost:3000
//   - puppeteer + sharp installed in the repo (already the case)
//
// Output:
//   /tmp/check-{slug}/NN-name.png  (one per screen)
//   /tmp/check-{slug}-grid.png     (4-column grid for holistic review)

import { readdirSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";
import sharp from "sharp";

const [, , slug, lang = ""] = process.argv;
if (!slug) {
  console.error("Usage: capture-project.mjs <slug> [lang]");
  process.exit(1);
}

const projectDir = path.join(
  process.cwd(),
  "projects",
  slug,
  "screenshots",
);
const screens = readdirSync(projectDir)
  .filter((f) => /\.tsx$/.test(f))
  .map((f) => f.replace(/\.tsx$/, ""))
  .sort();

if (screens.length === 0) {
  console.error(`No screenshots found in ${projectDir}`);
  process.exit(1);
}

const outDir = `/tmp/check-${slug}`;
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

const langParam = lang ? `&lang=${lang}` : "";
for (const s of screens) {
  const url = `http://localhost:3000/preview/${slug}/${s}?format=phone${langParam}`;
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 300));
  const buf = await page.screenshot({ type: "png" });
  await writeFile(`${outDir}/${s}.png`, buf);
  console.log(`${s} ✓`);
}

// Compose a grid (up to 4 cols × 2 rows = 8 screens)
const cols = Math.min(4, screens.length);
const rows = Math.ceil(screens.length / cols);
const W = 260;
const H = Math.round(W * (1920 / 1080));
const imgs = await Promise.all(
  screens.map((n) => sharp(`${outDir}/${n}.png`).resize(W, H).toBuffer()),
);
await sharp({
  create: {
    width: W * cols,
    height: H * rows,
    channels: 4,
    background: { r: 245, g: 245, b: 244, alpha: 1 },
  },
})
  .composite(
    imgs.map((input, i) => ({
      input,
      top: Math.floor(i / cols) * H,
      left: (i % cols) * W,
    })),
  )
  .png()
  .toFile(`/tmp/check-${slug}-grid.png`);

await browser.close();
console.log(`\nGrid saved → /tmp/check-${slug}-grid.png`);
console.log(`Individual screens → ${outDir}/*.png`);
console.log("\nNow Read the grid and verify the layout checklist in SKILL.md.");
