# lshoot

> Bootstrap your own [Lshoot](https://github.com/RDH36/Lshoot) instance — a code-first ASO screenshot generator for the App Store and Google Play.

Clones the Lshoot repo, swaps the public marketing landing for a personal dashboard, and offers to install dependencies. Zero npm dependencies — runs anywhere with Node 20+ and Git.

## Quick start

```bash
npx lshoot my-app
# or
pnpm dlx lshoot my-app
```

Then:

```bash
cd my-app
pnpm install        # if you skipped it in the CLI
pnpm dev            # http://localhost:3000
```

## What it does

1. **Clones** `https://github.com/RDH36/Lshoot.git` into the directory you name
2. **Wipes** the original git history (so you start fresh)
3. **Replaces** `app/page.tsx` with a project-dashboard landing (lists your projects, links to `/dashboard` and `/docs`) — not the public marketing page
4. **Removes** the landing-protection files (`.landing-lock`, `scripts/check-landing.mjs`, `.husky/pre-commit`, `prepare` script) since you own this fork now
5. **Installs** dependencies with `pnpm` if you confirm

## Requirements

- **Node.js 20+**
- **Git** (any recent version)
- **pnpm** (optional, but needed to run the dev server — install via `corepack enable`)

## Usage

```
lshoot <directory>          Clone Lshoot into <directory> and customize it
lshoot --help               Show help
lshoot --version            Show the CLI version
```

## License

MIT — see [LICENSE](./LICENSE).
