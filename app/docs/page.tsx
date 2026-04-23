import Link from "next/link";
import { DocsSidebar } from "@/components/docs-sidebar";

export const metadata = {
  title: "Docs — Lshoot",
  description: "How to install and use Lshoot with Claude Code or manually",
};

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "install", label: "Install & clone" },
  { id: "first-run", label: "First run" },
  { id: "with-ai", label: "With Claude Code (AI)" },
  { id: "manually", label: "Manually" },
  { id: "config", label: "Project config" },
  { id: "screenshot", label: "Writing a screenshot" },
  { id: "assets", label: "Uploading assets" },
  { id: "i18n", label: "Multi-language" },
  { id: "fonts", label: "Custom fonts" },
  { id: "mockup-html", label: "Advanced HTML mockup" },
  { id: "export", label: "Exporting" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

export default function DocsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#fafaf9", color: "#1c1917" }}
    >
      <header
        className="sticky top-0 z-10 backdrop-blur border-b"
        style={{
          background: "rgba(250, 250, 249, 0.85)",
          borderColor: "#e7e5e4",
        }}
      >
        <div className="container mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm hover:underline"
            style={{ color: "#78716c" }}
          >
            ← Home
          </Link>
          <h1 className="font-semibold">Lshoot documentation</h1>
          <Link
            href="/dashboard"
            className="text-sm hover:underline"
            style={{ color: "#059669" }}
          >
            Dashboard →
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <DocsSidebar items={TOC} />

        <article
          className="max-w-none
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-20
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:my-4 [&_p]:leading-relaxed
          [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:my-1
          [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal
          [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
          [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:my-4
          [&_pre_code]:p-0 [&_pre_code]:text-inherit
          [&_table]:w-full [&_table]:my-4 [&_th]:text-left [&_th]:p-2 [&_th]:font-semibold
          [&_td]:p-2
          [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
        "
          style={
            {
              "--tw-prose-body": "#1c1917",
              color: "#1c1917",
            } as React.CSSProperties
          }
        >
          <style>
            {`
              article code { background: #f5f5f4; color: #1c1917; }
              article pre { background: #1c1917; color: #fafaf9; }
              article pre code { background: transparent; color: #fafaf9; }
              article a { color: #059669; text-decoration: underline; }
              article a:hover { color: #047857; }
              article blockquote { border-color: #e7e5e4; color: #57534e; }
              article th, article td { border-bottom: 1px solid #e7e5e4; }
            `}
          </style>

          <Section id="intro" title="Introduction">
            <p>
              <strong>Lshoot</strong> generates ASO (App Store / Play Store)
              screenshots for a mobile app from React components. You describe each
              screen in JSX (headline, mockup, background) and the app produces the
              PNGs in every format Apple + Google require, in every language you
              declare.
            </p>
            <p>
              Two ways to use it: <strong>with Claude Code</strong> (the AI writes
              screenshots from an ASO brief) or <strong>manually</strong> (you write
              the JSX yourself).
            </p>
            <p>
              <strong>Applicable to any type of app</strong>: games, wellness,
              productivity, SaaS, finance, e-commerce, dev tools, social, health,
              education. Each app has its own brand — adapt the templates to the
              tone.
            </p>
          </Section>

          <Section id="install" title="Install & clone">
            <p>Lshoot is a local-first Next.js app. Everything runs on your machine.</p>

            <h3>Prerequisites</h3>
            <ul>
              <li><strong>Node.js 20+</strong> (check with <code>node --version</code>)</li>
              <li><strong>pnpm 10+</strong> (install with <code>npm install -g pnpm</code>)</li>
              <li><strong>Git</strong></li>
            </ul>

            <h3>1. Clone the repo</h3>
            <pre><code>{`git clone <your-fork-or-origin-url> lshoot
cd lshoot`}</code></pre>

            <h3>2. Install dependencies</h3>
            <pre><code>{`pnpm install`}</code></pre>
            <p>
              This installs Next.js, Puppeteer (with Chromium), Sharp, Zod, shadcn/ui,
              Husky (git hooks), and the Google fonts. Total download is around{" "}
              <code>~400 MB</code> (most of it is Chromium for Puppeteer).
            </p>

            <h3>3. Chromium download (if Puppeteer skipped it)</h3>
            <p>
              pnpm 10 blocks install scripts by default. The{" "}
              <code>package.json</code> whitelists Puppeteer and Sharp via{" "}
              <code>pnpm.onlyBuiltDependencies</code>. If Chromium is still missing:
            </p>
            <pre><code>{`pnpm rebuild puppeteer`}</code></pre>

            <h3>4. Start the dev server</h3>
            <pre><code>{`pnpm dev`}</code></pre>
            <p>
              Open <a href="http://localhost:3000">http://localhost:3000</a>. You will
              land on the home page.
            </p>

            <h3>Structure of the repo</h3>
            <pre><code>{`lshoot/
├── app/               Next.js App Router (landing, dashboard, API, preview, /docs)
├── components/aso/    Screenshot component library (DeviceFrame, AppMockup, ...)
├── components/ui/     shadcn components for the dashboard
├── projects/{slug}/   Your projects (config.json + screenshots + assets)
├── lib/               Formats spec, Puppeteer pipeline, Sharp export, schemas
├── exports/           Generated PNGs (gitignored)
├── .claude/skills/    Claude Code skill for automated project creation
└── scripts/           Internal scripts (landing page protection, etc.)`}</code></pre>

            <h3>Build for production (optional)</h3>
            <pre><code>{`pnpm build
pnpm start`}</code></pre>
            <p>
              Only useful if you want to serve Lshoot on a machine other than your own
              dev laptop. For day-to-day use, <code>pnpm dev</code> is fine.
            </p>
          </Section>

          <Section id="first-run" title="First run">
            <p>
              After <code>pnpm dev</code>, the dashboard lists projects found in{" "}
              <code>projects/</code>. A demo project (<code>example-app</code>) and a
              full reference project (<code>flipia</code>) are provided.
            </p>

            <h3>Open the dashboard</h3>
            <p>
              Click <strong>Get Started</strong> in the nav (top-right) then go to{" "}
              <a href="/dashboard">Dashboard</a>, or jump directly to{" "}
              <code>localhost:3000/dashboard</code>.
            </p>

            <h3>Preview a screenshot</h3>
            <p>
              From the dashboard, click any project card, then any thumbnail. You land
              on the preview route <code>/preview/{"{slug}"}/{"{screenshot}"}</code> that
              renders the screenshot at its target viewport size (1290×2796 by default).
            </p>

            <h3>Export a PNG</h3>
            <p>
              On the project page, click <strong>Export</strong>. A popover lets you
              pick which screenshots, formats, and languages to export. Files land in{" "}
              <code>/exports/{"{slug}"}/{"{lang}"}/{"{store}"}/{"{format}"}/</code>.
            </p>
          </Section>

          <Section id="with-ai" title="With Claude Code (AI)">
            <p>Automated workflow via the <code>new-aso-project</code> skill.</p>

            <h3>1. Prepare the brief</h3>
            <p>
              Write an ASO brief (freeform or structured Markdown) describing your app:
              name, bundleId, value prop, audience, features, brand colors, tone,
              target languages. If you have the app's source code, mention the path —
              the agent will extract the exact palette and fonts.
            </p>
            <p>
              Briefs typically live in <code>/aso-project/{"{slug}"}/aso.md</code>
              (gitignored). You can also paste the brief directly in the chat.
            </p>

            <h3>2. Invoke the skill</h3>
            <pre><code>/new-aso-project aso-project/my-app/aso.md</code></pre>
            <p>
              The agent reads the brief, asks for missing details, scaffolds the
              project in <code>/projects/{"{slug}"}/</code>, writes{" "}
              <code>config.json</code> + 6-8 JSX screenshots, creates an i18n
              dictionary if multilingual, and asks you to upload assets.
            </p>

            <h3>3. Upload app captures</h3>
            <p>
              From the dashboard → project page → <strong>Assets</strong> button →
              drag and drop your Xcode simulator / Android emulator captures (PNG,
              JPG, WebP, 10 MB max).
            </p>

            <h3>4. Preview</h3>
            <p>
              The project page shows a live grid of thumbnails (scaled iframes). Click
              any thumbnail to open the full-size preview. If you declared{" "}
              <code>languages</code>, an FR/EN/… switcher appears.
            </p>

            <h3>5. Export</h3>
            <p>
              Click <strong>Export</strong> → popover with checkboxes (screenshots,
              formats, languages). Pick what you want and click{" "}
              <strong>Export N PNGs</strong>. Files land in{" "}
              <code>/exports/{"{slug}"}/{"{lang}"}/{"{store}"}/{"{format}"}/</code>.
            </p>
          </Section>

          <Section id="manually" title="Manually">
            <p>
              If you prefer writing JSX yourself (no AI), you can scaffold the project
              by hand and create files directly. The sections below detail each step.
            </p>

            <h3>Steps</h3>
            <ol>
              <li><code>mkdir -p projects/my-app/screenshots projects/my-app/assets</code></li>
              <li>Create <code>projects/my-app/config.json</code> (see below)</li>
              <li>Upload captures to <code>/projects/my-app/assets/</code></li>
              <li>Write screenshots <code>NN-name.tsx</code> in <code>screenshots/</code></li>
              <li>Preview at <code>localhost:3000/projects/my-app</code></li>
              <li>Click Export and select formats/languages</li>
            </ol>
          </Section>

          <Section id="config" title="Project config">
            <p>
              Each project = a folder in <code>/projects/</code> with a minimal{" "}
              <code>config.json</code>:
            </p>
            <pre><code>{`{
  "name": "My App",
  "bundleId": "com.company.myapp",
  "defaultDeviceFrame": "iphone-15-pro",
  "languages": ["en", "fr"]
}`}</code></pre>

            <h3>Fields</h3>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>name</code></td><td>Yes</td><td>Commercial name shown in the dashboard</td></tr>
                <tr><td><code>bundleId</code></td><td>Yes</td><td>Reverse-DNS (<code>[a-zA-Z0-9._-]+</code>)</td></tr>
                <tr><td><code>defaultDeviceFrame</code></td><td>No</td><td><code>iphone-15-pro</code> / <code>iphone-15</code> / <code>ipad-13</code> / <code>android-phone</code></td></tr>
                <tr><td><code>languages</code></td><td>No</td><td>Array of codes (e.g. <code>["en", "fr"]</code>). Enables switcher + multi-lang export</td></tr>
                <tr><td><code>protected</code></td><td>No</td><td>When <code>true</code>, export requires a developer code. Used for private/reference projects.</td></tr>
                <tr><td><code>appStoreId</code></td><td>No</td><td>Reference only</td></tr>
                <tr><td><code>playStoreId</code></td><td>No</td><td>Reference only</td></tr>
              </tbody>
            </table>
          </Section>

          <Section id="screenshot" title="Writing a screenshot">
            <p>
              A screenshot = a file <code>NN-name.tsx</code> in{" "}
              <code>projects/{"{slug}"}/screenshots/</code>. The <code>NN</code> prefix
              sets the order in the store.
            </p>

            <h3>Rules</h3>
            <ul>
              <li>Single <code>export default</code></li>
              <li>Component fills <code>w-full h-full</code></li>
              <li>
                <strong>Don't</strong> wrap in <code>&lt;ScreenshotCanvas&gt;</code> —
                the preview route does it
              </li>
              <li>
                Imports: only <code>@/components/aso</code> (+ local project
                components). No shadcn, no lucide
              </li>
              <li>No <code>&quot;use client&quot;</code>, no React state</li>
              <li>No responsive classes (<code>sm:</code>, <code>md:</code>)</li>
              <li>Web fonts: via <code>next/font</code> in <code>app/layout.tsx</code></li>
            </ul>

            <h3>Minimal example</h3>
            <pre><code>{`import { GradientBackground, Headline, Subheadline } from "@/components/aso";

export default function Hero() {
  return (
    <div className="w-full h-full">
      <GradientBackground from="#6366f1" to="#ec4899" direction="to-br" />
      <div className="relative w-full h-full flex flex-col items-center justify-center px-[8%] text-center">
        <Headline size="6xl" color="#ffffff">
          Build habits<br />that stick
        </Headline>
        <Subheadline size="xl" color="#f5f3ff">
          5 minutes a day
        </Subheadline>
      </div>
    </div>
  );
}`}</code></pre>

            <h3>Available components</h3>
            <p>All exported from <code>@/components/aso</code>:</p>
            <table>
              <thead><tr><th>Component</th><th>Main props</th></tr></thead>
              <tbody>
                <tr><td><code>DeviceFrame</code></td><td><code>variant</code> (iphone-15-pro, iphone-15, ipad-13, android-phone)</td></tr>
                <tr><td><code>AppMockup</code></td><td><code>src</code>, <code>device</code>, <code>fit</code> (cover/contain)</td></tr>
                <tr><td><code>Headline</code></td><td><code>size</code> (xl → 6xl), <code>color</code>, <code>align</code></td></tr>
                <tr><td><code>Subheadline</code></td><td><code>size</code> (sm → xl), <code>color</code>, <code>align</code></td></tr>
                <tr><td><code>GradientBackground</code></td><td><code>from</code>, <code>to</code>, <code>via?</code>, <code>direction</code></td></tr>
                <tr><td><code>SolidBackground</code></td><td><code>color</code></td></tr>
                <tr><td><code>PatternBackground</code></td><td><code>pattern</code> (dots/grid/waves), <code>color</code>, <code>size</code>, <code>opacity</code></td></tr>
                <tr><td><code>CenteredLayout</code></td><td><code>headline</code>, <code>subheadline</code>, <code>mockup</code>, <code>padding</code>, <code>textPosition</code></td></tr>
                <tr><td><code>SplitLayout</code></td><td><code>text</code>, <code>mockup</code>, <code>direction</code>, <code>reverse</code></td></tr>
              </tbody>
            </table>

            <h3>8 reference templates</h3>
            <p>
              <code>projects/example-app/screenshots/</code> contains 8 copy-paste ASO
              patterns: Hero + Typography, Device Center, Split Layout, Tilted 3D,
              Minimalist, Floating Callouts, Dark SaaS, Call to Action.
            </p>
          </Section>

          <Section id="assets" title="Uploading assets">
            <p>Assets are raw captures of your app (Xcode simulator or Android emulator).</p>
            <ul>
              <li>Accepted formats: PNG, JPG, WebP (max 10 MB)</li>
              <li>
                From the dashboard: <strong>Assets (N)</strong> button on the project
                page → drag & drop
              </li>
              <li>
                Or directly: copy files into <code>/projects/{"{slug}"}/assets/</code>
              </li>
            </ul>
            <p>Reference in a screenshot via the API route:</p>
            <pre><code>{`<AppMockup src="/api/assets/my-app/home.png" device="iphone-15-pro" />`}</code></pre>
            <blockquote>
              Never reference <code>/projects/...</code> directly — the{" "}
              <code>/api/assets/...</code> route is secured against path traversal.
            </blockquote>
          </Section>

          <Section id="i18n" title="Multi-language">
            <p>To support multiple languages in a single project:</p>

            <h3>1. Create the dictionary</h3>
            <p>Create <code>projects/{"{slug}"}/i18n.tsx</code>:</p>
            <pre><code>{`import type { ReactNode } from "react";

export const LANGUAGES = ["en", "fr"] as const;

type ScreenT = {
  headline: (accent: string) => ReactNode;
  sub: string;
};

const EN = {
  duel: {
    headline: (c: string) => <>Memory just got<br /><span style={{ color: c }}>competitive</span></>,
    sub: "Face real players online",
  },
};

const FR = {
  duel: {
    headline: (c: string) => <>Le memory<br />devient un <span style={{ color: c }}>duel</span></>,
    sub: "Affronte de vrais joueurs en ligne",
  },
};

export function useT(lang?: string) {
  return lang === "fr" ? FR : EN;
}`}</code></pre>

            <h3>2. Use in screenshots</h3>
            <pre><code>{`import { useT } from "../i18n";
const ACCENT = "#A2340A";

export default function Duel({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <MyLayout
      headline={<h1>{t.duel.headline(ACCENT)}</h1>}
      subheadline={<p>{t.duel.sub}</p>}
    />
  );
}`}</code></pre>

            <h3>3. Declare in config.json</h3>
            <pre><code>{`{ "languages": ["en", "fr"] }`}</code></pre>
          </Section>

          <Section id="fonts" title="Custom fonts">
            <p>
              To match a specific app's identity, add its fonts in{" "}
              <code>app/layout.tsx</code> via <code>next/font/google</code>:
            </p>
            <pre><code>{`import { Fredoka, Nunito } from "next/font/google";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// In <html className={...}> append:
// \${fredoka.variable}`}</code></pre>
            <p>Then in screenshots:</p>
            <pre><code>{`<div style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>
  {/* all children inherit */}
</div>`}</code></pre>
          </Section>

          <Section id="mockup-html" title="Advanced HTML mockup">
            <p>
              For apps where you want a <strong>faithful</strong> and{" "}
              <strong>localizable</strong> inner render, write the mockup in React
              inside <code>projects/{"{slug}"}/components/</code> instead of uploading
              a PNG.
            </p>

            <h3>When to use it</h3>
            <ul>
              <li>The app has an iconic UI to showcase (game, dashboard, map)</li>
              <li>
                Color emojis must stay color (Sharp/SVG renders them black — only
                Chromium renders them in color)
              </li>
              <li>Content needs to be localizable</li>
              <li>Frequent iteration on the look</li>
            </ul>
            <p>
              See <code>projects/flipia/components/GameMockup.tsx</code> as a reference.
            </p>
          </Section>

          <Section id="export" title="Exporting">
            <p>
              The <strong>Export</strong> button on the project page opens a popover
              where you pick:
            </p>
            <ul>
              <li>Screenshots to export (all by default)</li>
              <li>Formats: App Store + Play Store (required only by default)</li>
              <li>Languages: if <code>languages</code> is in config</li>
            </ul>

            <h3>Render pipeline</h3>
            <p>
              Puppeteer launches Chromium with 26 Remotion-style flags
              (<code>--force-color-profile=srgb</code>,{" "}
              <code>--font-render-hinting=none</code>, background processes disabled…).
              For each screenshot × format × language:
            </p>
            <ol>
              <li>
                Visits{" "}
                <code>/preview/{"{slug}"}/{"{screenshot}"}?format={"{id}"}&amp;lang={"{lang}"}</code>
              </li>
              <li>Viewport at 2x DPR</li>
              <li>Waits for fonts.ready + all images loaded + double rAF</li>
              <li>
                Captures via <code>boundingBox</code> of{" "}
                <code>[data-screenshot-canvas]</code>
              </li>
              <li>Sharp downsamples in Lanczos3, PNG compressed</li>
            </ol>

            <h3>Output structure</h3>
            <ul>
              <li>
                With languages:{" "}
                <code>/exports/{"{slug}"}/{"{lang}"}/{"{store}"}/{"{format-id}"}/{"{screenshot}"}.png</code>
              </li>
              <li>
                Without languages:{" "}
                <code>/exports/{"{slug}"}/{"{store}"}/{"{format-id}"}/{"{screenshot}"}.png</code>
              </li>
            </ul>

            <h3>Via curl (CLI)</h3>
            <pre><code>{`curl -N -X POST http://localhost:3000/api/export \\
  -H "Content-Type: application/json" \\
  -d '{"project":"my-app","langs":["en","fr"]}'`}</code></pre>

            <h3>Protected projects</h3>
            <p>
              If a project's <code>config.json</code> has <code>"protected": true</code>,
              the export endpoint requires a developer code. In the UI, a prompt asks
              for the code before running. Via curl, pass it in the body:
            </p>
            <pre><code>{`curl -X POST http://localhost:3000/api/export \\
  -H "Content-Type: application/json" \\
  -d '{"project":"flipia","devCode":"<code>"}'`}</code></pre>
          </Section>

          <Section id="troubleshooting" title="Troubleshooting">
            <h3>Puppeteer doesn't download Chromium</h3>
            <pre><code>pnpm rebuild puppeteer</code></pre>

            <h3>Port 3000 busy</h3>
            <pre><code>pkill -f "next-server"</code></pre>

            <h3>Device frame appears black / empty</h3>
            <p>
              Ensure <code>AppMockup</code> has a parent container with defined
              height (flex container).
            </p>

            <h3>"N" Next.js badge in exports</h3>
            <p><code>next.config.ts</code> must contain <code>devIndicators: false</code>.</p>

            <h3>Emojis appear black in an uploaded PNG</h3>
            <p>
              Sharp/SVG doesn't render color emojis. Use an HTML mockup in{" "}
              <code>components/</code> (rendered by Chromium).
            </p>

            <h3>/preview shows a dynamic import error</h3>
            <p>
              Check that the file exists and its name only contains{" "}
              <code>[a-zA-Z0-9._-]</code>.
            </p>

            <h3>Export is refused on a project</h3>
            <p>
              The project is protected (<code>"protected": true</code> in config.json).
              Enter the developer code in the prompt, or pass <code>devCode</code>{" "}
              in the API body.
            </p>
          </Section>
        </article>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
