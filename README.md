# Lshoot

ASO screenshot generator (App Store / Play Store), **code-first**, inspired by Remotion.
Describe your screenshots in React/JSX, the app exports PNGs for every Apple + Google
format in a single command.

## Quickstart

**One-liner** (recommended) — clones the repo, swaps the marketing landing for your
personal dashboard, and offers to install dependencies:

```bash
npx github:RDH36/Lshoot my-app
cd my-app
pnpm dev
```

**Manual** — if you prefer cloning yourself:

```bash
git clone https://github.com/RDH36/Lshoot.git my-app
cd my-app
node cli/index.mjs .       # or skip and just run pnpm install + pnpm dev
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Click **Open dashboard** to manage your projects, or **Docs** for a guided walkthrough.

## Documentation

The full documentation is available **inside the app** at [http://localhost:3000/docs](http://localhost:3000/docs):

- **Install & clone** — prerequisites, setup, first run
- **With Claude Code / Cursor (AI)** — automated workflow via the `new-aso-project` skill
- **Manually** — create a project by hand, write screenshots, export

## Structure

```
app/                  Next.js App Router (landing + dashboard + API + preview + /docs)
components/aso/       Component library for screenshots
projects/{slug}/      User projects (config + screenshots + assets)
lib/                  Formats, Puppeteer, export, schemas
exports/              PNG output (gitignored)
.claude/skills/       Claude Code skills
scripts/              Internal scripts (landing protection, etc.)
```

## License & protection

You are free to modify, fork, and use every file in this repository for your own projects
**except**:

1. **The landing page** (`app/page.tsx`) — brand identity of the original author. Protected by a git pre-commit hook via Husky.
2. **The `flipia` project** (`projects/flipia/`) — personal project of the original author. Export is locked; running it through the Export API or UI requires a developer code.

To modify either, pass the developer code via env var or prompt. Without the code:
- Commits touching `app/page.tsx` are refused.
- Exports of the `flipia` project are refused with HTTP 403.

Every other file is yours: screenshots in `projects/{your-app}/`, components, lib, docs, config — change anything.

## Commands

| Command | Effect |
|---------|--------|
| `pnpm dev` | Local server with Turbopack |
| `pnpm build` | Production build |
| `pnpm cli <dir>` | Set up a fresh Lshoot instance in `<dir>` (clone + customize) |
| `node scripts/check-landing.mjs` | Manually verify the landing is unchanged |

## Project docs (development)

- [PRD.md](./PRD.md) — what we're building and why
- [ARCHI.md](./ARCHI.md) — tech stack and ADRs
- [CLAUDE.md](./CLAUDE.md) — conventions for Claude Code
- [specs/01-mvp/](./specs/01-mvp/) — MVP implementation tasks

## Troubleshooting

**Puppeteer doesn't download Chromium** — pnpm 10 blocks install scripts:
```bash
pnpm rebuild puppeteer
```

**Port 3000 busy** — an orphan persists:
```bash
pkill -f "next-server"
```

For anything else, see `/docs` in the app.
