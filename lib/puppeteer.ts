import puppeteer, { type Browser } from "puppeteer";

let browserPromise: Promise<Browser> | null = null;

// Chrome flags inspirés du pipeline de rendu Remotion :
// couleurs sRGB déterministes, fonts sans hinting (plus nets à haute DPR),
// background processes désactivés pour un rendu reproductible.
const RENDER_FLAGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--force-color-profile=srgb",
  "--font-render-hinting=none",
  "--disable-gpu",
  "--hide-scrollbars",
  "--mute-audio",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-renderer-backgrounding",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-default-apps",
  "--disable-extensions",
  "--disable-features=Translate,ChromeWhatsNewUI",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-popup-blocking",
  "--disable-prompt-on-repost",
  "--disable-sync",
  "--metrics-recording-only",
  "--no-first-run",
  "--no-default-browser-check",
  "--no-pings",
];

export function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = puppeteer.launch({
      headless: true,
      args: RENDER_FLAGS,
      defaultViewport: null,
    });
  }
  return browserPromise;
}

export type Viewport = {
  width: number;
  height: number;
  deviceScaleFactor?: number;
};

// Attente multi-phase : fonts prêtes, toutes les images chargées,
// double rAF pour garantir qu'un cycle de render React/CSS est fini.
async function waitForRenderStable(
  page: Awaited<ReturnType<Browser["newPage"]>>,
): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready;

    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete && img.naturalWidth > 0
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }),
      ),
    );

    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r())),
    );
  });
}

export async function captureScreenshot(
  url: string,
  viewport: Viewport,
): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // Capture à 2x DPR pour un rendu net, downscale ensuite via Sharp (Lanczos3).
    const targetDpr = viewport.deviceScaleFactor ?? 2;
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: targetDpr,
    });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await waitForRenderStable(page);

    const canvas = await page.$("[data-screenshot-canvas]");
    const clip = canvas ? (await canvas.boundingBox()) ?? undefined : undefined;

    const buffer = await page.screenshot({
      type: "png",
      fullPage: false,
      omitBackground: false,
      optimizeForSpeed: false,
      captureBeyondViewport: false,
      fromSurface: true,
      clip,
    });
    return Buffer.from(buffer);
  } finally {
    await page.close();
  }
}

export async function closeBrowser(): Promise<void> {
  if (browserPromise) {
    const b = await browserPromise;
    await b.close();
    browserPromise = null;
  }
}
