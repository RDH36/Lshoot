import Link from "next/link";

export const metadata = {
  title: "Contact — Lshoot",
  description: "Reach out to Raymond Dzery Hago",
};

const LINKEDIN_URL =
  "https://www.linkedin.com/in/raymond-dzery-hago-25013221b/";
const FACEBOOK_URL = "https://www.facebook.com/rdh36/";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
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
          <h1 className="font-semibold">Contact</h1>
          <div className="w-[50px]" />
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-2xl px-6 py-16">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 text-white font-black text-4xl"
            style={{ background: "#059669" }}
          >
            R
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Raymond Dzery Hago
          </h2>
          <p className="mt-2 text-[15px]" style={{ color: "#78716c" }}>
            Independent developer · Author of Lshoot
          </p>
        </div>

        <div className="space-y-3">
          <ContactLink
            href={LINKEDIN_URL}
            label="LinkedIn"
            username="Raymond Dzery Hago"
            icon={<LinkedInIcon />}
          />
          <ContactLink
            href={FACEBOOK_URL}
            label="Facebook"
            username="rdh36"
            icon={<FacebookIcon />}
          />
        </div>

        <div
          className="mt-16 rounded-xl border p-8"
          style={{ borderColor: "#e7e5e4", background: "#ffffff" }}
        >
          <h3 className="font-semibold text-[17px]">What can I help with?</h3>
          <ul
            className="mt-4 space-y-2 text-[14px] leading-relaxed"
            style={{ color: "#57534e" }}
          >
            <li>
              <strong style={{ color: "#1c1917" }}>Questions about Lshoot</strong> —
              feature requests, bug reports, usage help.
            </li>
            <li>
              <strong style={{ color: "#1c1917" }}>Collaborations</strong> — open
              to interesting projects in indie mobile, ASO, or dev tooling.
            </li>
            <li>
              <strong style={{ color: "#1c1917" }}>Hiring</strong> — I ship React /
              Next.js / React Native / Expo. Based in Madagascar, working worldwide.
            </li>
          </ul>
          <p
            className="mt-6 text-[13px] italic"
            style={{ color: "#78716c" }}
          >
            Fastest response via LinkedIn DM.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ContactLink({
  href,
  label,
  username,
  icon,
}: {
  href: string;
  label: string;
  username: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center gap-4 rounded-xl border p-5 transition-colors hover:border-[#059669]"
      style={{
        borderColor: "#e7e5e4",
        background: "#ffffff",
      }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ background: "#f5f5f4" }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-[15px]">{label}</div>
        <div className="text-[13px]" style={{ color: "#78716c" }}>
          {username}
        </div>
      </div>
      <span style={{ color: "#78716c" }}>↗</span>
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#0a66c2"
      width="24"
      height="24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.854 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#1877f2"
      width="24"
      height="24"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
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
