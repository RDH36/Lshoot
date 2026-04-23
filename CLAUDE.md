@AGENTS.md

# Screenshoot App — Conventions pour Claude Code

Tu aides à créer des screenshots ASO (App Store / Play Store) en React/JSX pour **tout type d'app mobile** (jeux, wellness, productivité, SaaS, finance, e-commerce, social, dev tools, santé, éducation…). Chaque app a sa propre charte, son tone, son audience — adapte les patterns en conséquence.

## Structure repo (ne pas la casser)

```
components/aso/       # Bibliothèque de composants pour screenshots (pas shadcn)
components/ui/        # shadcn — uniquement pour le dashboard
components/           # Client components (export-button, language-switcher, etc.)
projects/{slug}/      # Projets utilisateur (données)
  config.json         # Validé par Zod (voir lib/schemas.ts) — peut avoir "languages"
  screenshots/NN-*.tsx
  assets/*.png
  components/         # Optionnel : Layout, mockups HTML, helpers partagés
  i18n.tsx            # Optionnel : dictionnaire multi-langues
app/                  # Next.js App Router (dashboard + routes API + /preview + /docs)
lib/                  # Utilitaires (formats, project-loader, puppeteer, export, schemas)
exports/              # Sortie PNG (gitignored)
aso-project/          # Briefs ASO raw (gitignored)
.claude/skills/       # Skills Claude Code
```

## Où créer les fichiers

- **Screenshot** : `projects/{app-slug}/screenshots/NN-nom.tsx`
  - `NN` = préfixe numérique 2 chiffres (`01-`, `02-`…) qui définit l'ordre dans le store
  - Un seul `export default` par fichier
- **Asset** (captures Xcode/emulator) : `projects/{app-slug}/assets/*.png`
  - Référencer depuis le JSX via `/api/assets/{app-slug}/{filename}` (PAS `/projects/...` directement)
- **Config projet** : `projects/{app-slug}/config.json`

## Règles JSX pour les screenshots

- Le composant exporté rend le **contenu** du screenshot, il remplit `w-full h-full` — **ne pas** wrapper dans `<ScreenshotCanvas>` (la route `/preview/*` le fait automatiquement)
- Utiliser UNIQUEMENT les composants de `@/components/aso/*` + éventuellement des composants locaux du projet (`projects/{slug}/components/*`) — **pas** shadcn, **pas** lucide
- Tailwind OK, mais :
  - Pas de classes responsive (`sm:`, `md:`, `lg:`) — le viewport est fixe
  - Tailles en `rem` ou `%`, rarement en `px` absolus
- Pas de `"use client"`, pas de `useState`, pas de `useEffect` — rendu statique uniquement
- Polices web : uniquement via `next/font` déclaré dans `app/layout.tsx`, jamais d'`@import` CSS ni `<link>` direct

**Exemple minimal** :
```tsx
export default function Hero() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-500">
      <h1 className="text-white text-[10rem] font-bold">Hello</h1>
    </div>
  );
}
```

## Composants ASO disponibles (depuis `@/components/aso`)

- `<DeviceFrame variant="iphone-15-pro|iphone-15|ipad-13|android-phone">`
- `<AppMockup src="/api/assets/{slug}/home.png" device="iphone-15-pro" fit="cover|contain" />`
- `<Headline size="xl|2xl|3xl|4xl|5xl|6xl" align="center" color="#000">…</Headline>`
- `<Subheadline size="sm|md|lg|xl" align="center" color="#000">…</Subheadline>`
- `<GradientBackground from="#FF6B6B" to="#4ECDC4" via?="#123456" direction="to-b|to-t|to-br|to-bl|to-r|to-l" />`
- `<SolidBackground color="#1E293B" />`
- `<PatternBackground pattern="dots|grid|waves" color="#000" bgColor="#fff" size={40} opacity={0.15} />`
- `<CenteredLayout headline={…} subheadline={…} mockup={…} padding="sm|md|lg" textPosition="top|bottom" gap="3%" />`
- `<SplitLayout text={…} mockup={…} direction="horizontal|vertical" reverse padding="md" />`

_`<ScreenshotCanvas>` est appliqué automatiquement par la route `/preview/*` — ne pas l'importer dans un fichier screenshot._

## 8 templates de référence universels

Lis le template le plus proche dans `projects/example-app/screenshots/` et inspire-toi. Chaque fichier démarre par un commentaire qui nomme le pattern :

| Fichier | Pattern | Quand l'utiliser |
|---------|---------|------------------|
| `01-hero.tsx` | Hero + Bold Typography | 1er screenshot — value prop (pas de device) |
| `02-features.tsx` | Device Center + Headline | Workhorse — showcase d'une feature |
| `03-split.tsx` | Split Layout (vertical) | Zones text/device distinctes |
| `04-tilted.tsx` | Tilted Device 3D | Look moderne, perspective |
| `05-minimalist.tsx` | Minimalist + Whitespace | Premium, wellness, note-taking |
| `06-floating.tsx` | Floating UI Callouts | Annotations / features autour du device |
| `07-dark.tsx` | Dark SaaS | Linear/Superhuman, dev tools, power users |
| `08-cta.tsx` | Call to Action | Dernier screenshot — conversion finale |

## Adapter au tone de l'app

Chaque app a un tone qui dicte les patterns :

| Tone | Templates prioritaires | Palettes | Typography |
|------|------------------------|----------|------------|
| **playful** (jeux, kids, social) | 01 hero, 02 center, 06 floating, 08 CTA | couleurs vives ou pastels | ronds (Fredoka, Nunito), emojis OK |
| **premium** (wellness, meditation) | 01 hero, 05 minimalist, 08 CTA | sombre/neutre + 1 accent | raffiné (serif ou geometric sans) |
| **dev** (Linear, Raycast) | 07 dark, 01 hero dark, 03 split | noir + accent néon | mono (JetBrains) ou neutre (Inter) |
| **saas** (Notion, Figma) | toute la séquence standard | gradient brand color | Inter / system sans |
| **finance** (banking, budgeting) | 01 hero, 02 center, 07 dark | bleu/vert + dark | serious sans (Inter, SF Pro) |
| **e-commerce** | 06 floating, 02 center, 03 split | blanc + accent produit | moderne neutre |

## Conseils ASO (universels)

- **Max 5-12 mots** par screenshot, typo 72-120pt équivalent (tailles 3xl-6xl)
- **Value prop sur le 1er screenshot** — c'est le seul visible sans scroll dans la recherche
- **8 screenshots = parfait** (Apple accepte 10, Google Play 8)
- **Power words** : `instant`, `effortless`, `proven`, `live`, `free` > `great`, `better`
- **Varier les accents colorés** entre screenshots — pas tous le même (critique pour la grille store)
- **Pas d'emojis dans headline** (autorisés en callouts/badges)

## Patterns avancés

Quand le brief demande un rendu fidèle à l'app, multi-langue, ou polices custom, suivre les patterns documentés dans :

**[.claude/skills/new-aso-project/references/advanced-patterns.md](./.claude/skills/new-aso-project/references/advanced-patterns.md)**

Résumé des patterns disponibles :
- **Mockup HTML React** (au lieu de PNG) — pour reproduire l'UI de l'app avec emojis couleur, ou pour localiser le contenu intérieur du device
- **i18n multi-langues** — `projects/{slug}/i18n.tsx` avec `useT(lang)` + `"languages": ["fr","en"]` dans config.json
- **Layout custom par projet** — uniformiser tailles et spacing entre les 8 screenshots
- **Polices custom** via `next/font/google` (Fredoka, Inter, Poppins, etc.)
- **Extraction de charte** depuis le code source de l'app si le brief fournit un `sourceCodePath`

## Quand quel pattern ?

- **App simple, 1 langue, captures déjà prêtes** → templates de base + `<AppMockup src="..." />`
- **App avec UI distinctif à mettre en valeur** → mockup HTML dans `projects/{slug}/components/`
- **App publiée en plusieurs langues** → `i18n.tsx` + `languages` dans config
- **App avec identité typo forte** → polices custom dans `app/layout.tsx`
- **App avec code source accessible** → lire `tailwind.config` pour extraire palette exacte

## Règles générales

- TypeScript strict : pas de `any`, pas de `// @ts-ignore`
- Imports absolus via alias `@/*` ou relatifs dans un projet (`../components/...`)
- Pas de commentaires qui expliquent le WHAT — le nom et le type suffisent
- Max 250 lignes par fichier ; max 7 fichiers par dossier (CLAUDE.md global du user)

## Commandes

- `pnpm dev` — serveur local avec Turbopack (devIndicators désactivé pour exports propres)
- `pnpm build` — production build (doit passer sans warning)

## Docs du projet

- `README.md` — quickstart + pointeurs
- `/docs` — page de documentation complète (avec IA ou manuellement)
- `PRD.md` — ce qu'on construit et pourquoi
- `ARCHI.md` — stack technique, ADRs, arborescence
- `specs/01-mvp/*.md` — tâches d'implémentation
- `.claude/skills/new-aso-project/` — skill pour générer un nouveau projet ASO
