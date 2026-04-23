import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Lshoot",
  description: "Privacy Policy for Lshoot, a local-first ASO tool",
};

export default function PrivacyPage() {
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
        <div className="container mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm hover:underline"
            style={{ color: "#78716c" }}
          >
            ← Home
          </Link>
          <h1 className="font-semibold">Privacy Policy</h1>
          <div className="w-[50px]" />
        </div>
      </header>

      <article
        className="container mx-auto max-w-3xl px-6 py-12
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3
        [&_p]:my-3 [&_p]:leading-relaxed
        [&_ul]:my-3 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:my-1
        [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:bg-[#f5f5f4]
        [&_a]:underline
      "
        style={{ color: "#1c1917" }}
      >
        <p className="text-sm" style={{ color: "#78716c" }}>
          Last updated: April 2026
        </p>

        <h2>TL;DR</h2>
        <p>
          Lshoot runs entirely on your machine. <strong>We collect nothing.</strong>{" "}
          Your assets, config, screenshots, and exports never leave{" "}
          <code>localhost:3000</code>.
        </p>

        <h2>1. Data We Collect</h2>
        <p>
          <strong>None.</strong> Lshoot has no account system, no analytics, no
          telemetry, and no crash reporting. The Software does not send any
          information about you or your projects to any server.
        </p>

        <h2>2. Where Your Data Lives</h2>
        <p>All data stays on your machine, in the repository you cloned:</p>
        <ul>
          <li>
            <code>projects/{"{slug}"}/config.json</code> — your project metadata
          </li>
          <li>
            <code>projects/{"{slug}"}/assets/*</code> — raw app captures you uploaded
          </li>
          <li>
            <code>projects/{"{slug}"}/screenshots/*.tsx</code> — your screenshot code
          </li>
          <li>
            <code>exports/{"{slug}"}/*</code> — generated PNGs (gitignored by default)
          </li>
        </ul>
        <p>
          If you commit your repository to a remote (GitHub, GitLab…), only the
          files you explicitly commit are uploaded. The default{" "}
          <code>.gitignore</code> excludes <code>exports/</code> and{" "}
          <code>projects/*/assets/*</code>.
        </p>

        <h2>3. Third-Party Services Used by the Software</h2>
        <p>The only outbound network calls made by Lshoot:</p>
        <ul>
          <li>
            <strong>Google Fonts</strong> — loaded via <code>next/font/google</code>.
            Next.js downloads fonts at build/dev time. No user data is sent — just
            font file requests.
          </li>
          <li>
            <strong>Puppeteer / Chromium</strong> — downloads Chromium binaries
            once at install (from googleapis). No runtime data transmitted.
          </li>
        </ul>
        <p>
          Both are controlled by the open-source libraries, not by Lshoot itself.
          If you want to verify, inspect the source code.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Lshoot does not set any cookies. The Next.js dev server may set local
          preferences in <code>localStorage</code> (e.g., dark mode), but nothing is
          sent anywhere.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          Since we collect no data, there is nothing to request, modify, or delete on
          our side. Your data is under your control at all times — simply delete the
          repository folder and everything is gone.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          If this policy ever changes, the updated version will be committed to the
          repository. Since the Software is local-first, check the{" "}
          <code>app/privacy/page.tsx</code> file after pulling updates.
        </p>

        <h2>7. Contact</h2>
        <p>
          Questions about privacy? See the <Link href="/contact">contact page</Link>.
        </p>
      </article>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "#e7e5e4", background: "#f5f5f4" }}
    >
      <div
        className="container mx-auto max-w-6xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-[13px]"
        style={{ color: "#78716c" }}
      >
        <span>© {new Date().getFullYear()} Raymond Dzery Hago · Lshoot</span>
        <div className="flex items-center gap-5">
          <Link href="/terms" className="hover:text-[#1c1917]">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-[#1c1917]">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-[#1c1917]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
