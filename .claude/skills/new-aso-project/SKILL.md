---
name: new-aso-project
description: Crée un nouveau projet ASO dans ce repo (screenshoot-app) à partir d'un brief utilisateur. Déclenche cette skill quand l'utilisateur demande de générer des screenshots App Store/Play Store pour une nouvelle app, fournit un README/brief ASO, ou dit "nouveau projet ASO", "génère-moi les screenshots pour [app]", "ajoute une app à screenshoot". Parse le brief, scaffold /projects/{slug}/, écrit 6-8 screenshots JSX en piochant dans les 8 templates de référence ou en reproduisant le design de l'app via mockup HTML. Supporte multi-langues via i18n.tsx. Guide l'utilisateur pour uploader ses assets et déclencher l'export.
argument-hint: [chemin-vers-brief | description freeform]
---

# New ASO Project

Workflow end-to-end pour démarrer un nouveau projet ASO dans ce repo (screenshoot-app).
L'agent transforme un brief utilisateur en un projet complet avec screenshots prêts à exporter
en tous les formats App Store et Play Store, dans toutes les langues demandées.

## Contexte projet

Ce skill est **unique à ce repo**. Il suppose que tu travailles dans
`/home/raymond/Documents/project/screenshoot-app` (Next.js 16 + Puppeteer + Sharp).

Avant toute action, **lis** :
- `CLAUDE.md` — conventions JSX et liste des composants disponibles
- `projects/example-app/screenshots/01-hero.tsx` à `08-cta.tsx` — 8 patterns de référence
- `projects/flipia/` — exemple **complet** (Layout custom + GameMockup HTML + i18n FR/EN) — référence d'implémentation avancée

## Workflow (6 étapes)

### Étape 1 — Parser le brief

**Si l'utilisateur fournit** un chemin de fichier ou un bloc texte :
lire directement et extraire les champs (voir [references/brief-template.md](references/brief-template.md)).

Les briefs sont souvent dans `/aso-project/{slug}/` (gitignored). Fichiers typiques :
`aso.md` (stratégie complète) + `aso-screenshots.md` (spécifications par screenshot).

**S'il n'y a pas de brief** : poser ces 7 questions **en un seul message**, courtes :
1. Nom de l'app + bundleId ?
2. Value prop en 1 phrase (qu'est-ce que ça résout ?)
3. Audience cible ?
4. 3 à 5 features clés à highlighter ?
5. Couleurs de marque (hex ou nom) et tone (playful/premium/dev/wellness) ?
6. Langues souhaitées (fr / en / …) ?
7. Code source de l'app disponible (chemin) ? Si oui, on extrait fonts/palette/UI directement.

**Si code source fourni** (point 7), **avant de continuer** : lire `tailwind.config.js`, `app.json`, un component home — extraire les vraies couleurs, fonts, patterns d'UI.

**Normaliser** :
- `slug` = kebab-case du nom (ex : "Focus Timer" → `focus-timer`)
- `bundleId` doit matcher `^[a-zA-Z0-9._-]+$` (validé par Zod dans `lib/schemas.ts`)
- `defaultDeviceFrame` par défaut : `iphone-15-pro`
- `languages` validé par regex `^[a-z]{2}(-[A-Z]{2})?$` (ex : `fr`, `en`, `pt-BR`)

### Étape 2 — Scaffold le projet

```bash
mkdir -p projects/{slug}/screenshots projects/{slug}/assets
```

Créer `projects/{slug}/config.json` :
```json
{
  "name": "{name}",
  "bundleId": "{bundleId}",
  "defaultDeviceFrame": "iphone-15-pro",
  "languages": ["fr", "en"]
}
```

Si pas besoin d'i18n : omettre `languages`.

Créer `projects/{slug}/assets/.gitkeep` (vide) pour que le dossier soit versionné.

Vérifier avec `ls projects/{slug}/` que le dossier est bien créé.

### Étape 3 — Polices et charte (si app source fournie)

**Si l'app a une police custom** (ex : Fredoka, Nunito), ajouter dans `app/layout.tsx` :

```tsx
import { Fredoka, Nunito } from "next/font/google";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Ajouter ${fredoka.variable} ${nunito.variable} dans <html className={...}>
```

Puis les screenshots utilisent `style={{ fontFamily: "var(--font-fredoka), sans-serif" }}` sur les éléments de texte.

**Ne JAMAIS** utiliser `@import` CSS ni `<link>` direct — toujours `next/font/google`.

### Étape 4 — Stratégie de mockup : PNG placeholder vs React HTML

Deux approches selon le besoin :

**A. PNG placeholder via assets** (simple, rapide)
- L'utilisateur uploade des captures Xcode/emulator dans `/projects/{slug}/assets/`
- Les screenshots utilisent `<AppMockup src="/api/assets/{slug}/home.png" device="iphone-15-pro" />`
- Avantage : zéro code à écrire
- Inconvénient : pas localisable, captures datent vite

**B. Mockup HTML en React** (riche, localisable)
- Écrire `projects/{slug}/components/{Nom}Mockup.tsx` qui reproduit l'UI de l'app en JSX + Tailwind
- Les screenshots utilisent `<DeviceFrame variant="..."><MonMockup /></DeviceFrame>`
- Accepter des props pour tous les textes → alimenté par le dict i18n
- Avantage : emojis couleur rendus par Chromium, multi-langue naturel, zéro asset binaire
- Inconvénient : temps de dev pour reproduire l'UI

**Quand choisir B** : l'app a un UI iconique à mettre en valeur (ex : grille de jeu, tableau de bord, visualisation de données). Si le user veut "un mockup comme ça" en pointant vers un screen.

**Pattern B exemple** (voir `projects/flipia/components/GameMockup.tsx`) :
```tsx
export function GameMockup({
  opponentName = "Alex",
  pairsLabel = "PAIRES",        // localisable
  tornadoTitle = "Tornade prête",
  // ... beaucoup de props pour chaque string
}) {
  return <div className="w-full h-full ...">...</div>;
}
```

### Étape 5 — Multi-langues (si demandé)

Créer `projects/{slug}/i18n.tsx` avec un dict structuré :

```tsx
import type { ReactNode } from "react";

export const LANGUAGES = ["fr", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];

type ScreenT = {
  headline: (accent: string) => ReactNode;   // color passé au runtime
  sub: string;
};

export type T = {
  ui: {                              // strings du mockup intérieur
    pairsLabel: string;
    tornadoTitle: string;
    tornadoButton: string;
    playerName: string;
    opponentSubtitle: string;
    // ...
  };
  duel: ScreenT;
  tornado: ScreenT;
  // ... un objet par screenshot
};

const FR: T = { ... };
const EN: T = { ... };

const DICTS: Record<Lang, T> = { fr: FR, en: EN };

export function useT(lang?: string): T {
  return DICTS[lang as Lang] ?? FR;
}
```

**Règles du dict** :
- `headline` est une fonction `(accent: string) => ReactNode` — la couleur accent reste dans le screenshot (elle varie par écran) mais le texte/JSX vient du dict
- `sub` est une string simple
- `ui` contient tous les strings du mockup intérieur pour que les props du GameMockup soient localisables

**Les screenshots acceptent `{ lang?: string }` en prop** :
```tsx
import { useT } from "../i18n";
const ACCENT = "#A2340A";

export default function Duel({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <FlipiaLayout
      headline={<h1 className="...">{t.duel.headline(ACCENT)}</h1>}
      subheadline={<p>{t.duel.sub}</p>}
      mockup={<DeviceFrame ...><GameMockup {...t.ui} /></DeviceFrame>}
    />
  );
}
```

La route `/preview/{slug}/{screenshot}?lang=en` passe automatiquement `lang` au composant.

### Étape 6 — Layout component (OBLIGATOIRE pour la cohérence)

> ⚠️ **Règle critique** : TOUJOURS créer un layout component par projet pour les écrans avec device.
> Ne JAMAIS dupliquer la structure flex/padding dans chaque screenshot — ça produit des proportions
> incohérentes entre les 8 screens (c'est l'erreur la plus fréquente).

`projects/{slug}/components/Layout.tsx` — template à copier tel quel :

```tsx
import type { ReactNode } from "react";

type Props = {
  headline: ReactNode;
  subheadline?: ReactNode;
  mockup?: ReactNode;
  background?: ReactNode;
  textColor?: string;
};

export function MyAppLayout({
  headline,
  subheadline,
  mockup,
  background,
  textColor = "#0a0a0a",
}: Props) {
  return (
    <div
      className="w-full h-full relative"
      style={{
        color: textColor,
        fontFamily: "var(--font-XXX), sans-serif", // ← remplacer XXX par ta police
      }}
    >
      {background}
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        {/* Text zone */}
        <div className="pt-[9%] px-[7%] text-center w-full">
          {headline}
          {subheadline ? <div className="mt-[3%]">{subheadline}</div> : null}
        </div>
        {/* Device zone avec breathing padding */}
        <div className="flex-1 flex items-center justify-center w-full px-[8%] pt-[7%] pb-[9%] min-h-0">
          {mockup ? (
            <div className="h-full flex items-center justify-center">
              {mockup}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
```

**Pourquoi ces valeurs exactes** (testées sur canvas 1080×1920 et 1290×2796) :

| Zone | Padding | Pourquoi |
|------|---------|----------|
| Text zone top | `pt-[9%]` | Laisser respirer au-dessus du headline, pas collé au bord |
| Text zone horizontal | `px-[7%]` | Éviter coupure sur les grands écrans |
| Gap text → device | `pt-[7%]` (sur device zone) | **16% total de breathing room entre text et device** |
| Device zone horizontal | `px-[8%]` | Empêche le device de toucher les bords gauche/droite |
| Device zone bottom | `pb-[9%]` | Respiration en bas (l'utilisateur voit qu'il reste du vide sous le device) |
| Entre headline et subheadline | `mt-[3%]` | Tight mais lisible |

**Tailles typo validées** (canvas 1080×1920) :
- Headline : `text-[9.5rem] font-black leading-[0.9] tracking-tight` (pour écrans AVEC device)
- Headline : `text-[11rem] font-black leading-[0.9] tracking-tight` (pour écrans SANS device — hero, CTA)
- Subheadline : `<Subheadline size="lg">` depuis `@/components/aso`

**Device frame rectangulaire** (override pour look moderne) :
```tsx
<DeviceFrame
  variant="iphone-15-pro"
  className="h-full w-auto !rounded-[7%] !p-[2%]"
  screenClassName="!rounded-[5%]"
/>
```

**Usage type d'un écran** :
```tsx
import { AppMockup, GradientBackground, Subheadline } from "@/components/aso";
import { MyAppLayout } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#60a5fa";

export default function Features({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <MyAppLayout
      textColor="#ffffff"
      background={<GradientBackground from="#0c1e3a" to="#2563eb" direction="to-b" />}
      headline={
        <h1 className="text-[9.5rem] font-black leading-[0.9] tracking-tight">
          {t.features.headline(ACCENT)}
        </h1>
      }
      subheadline={<Subheadline size="lg" color="#dbeafe">{t.features.sub}</Subheadline>}
      mockup={<AppMockup src="/api/assets/{slug}/home.png" device="iphone-15-pro" />}
    />
  );
}
```

### Étape 7 — Générer les 6-8 screenshots JSX

**Choisir les patterns** selon le brief (voir [references/patterns-guide.md](references/patterns-guide.md)).

Structure type :
- `01-{slug}.tsx` — hook principal (value prop)
- `02-{slug}.tsx` à `07-{slug}.tsx` — features (varier les patterns)
- `08-{slug}.tsx` — CTA ou feature secondaire

**Règles couleurs** : chaque screenshot doit avoir **son propre accent color** (pas tous le même). Piocher dans la palette de la marque. Exemple Flipia : rouge (duel), orange (tornade), bleu (amis), vert (progrès).

**Règles JSX** (rappels de `CLAUDE.md`) :
- Un seul `export default` par fichier
- Composant remplit `w-full h-full` — **ne pas** wrapper dans `<ScreenshotCanvas>`
- Pas de `"use client"`, pas d'état React
- Tailwind OK, mais pas de classes responsive (`sm:`, `md:`) — viewport fixe
- Max 5-12 mots par screenshot (power words : "instant", "effortless", "proven")

### Étape 8 — Validation visuelle (OBLIGATOIRE)

> ⚠️ **Ne jamais livrer** sans avoir fait cette étape. Les proportions paraissent OK dans le code
> mais se cassent à l'écran. Toujours capturer et vérifier visuellement.

1. **Build compile sans erreur** :
   ```bash
   pnpm build
   ```

2. **Démarrer dev server + capturer les écrans** (script bundled avec le skill) :
   ```bash
   pnpm dev > /tmp/dev.log 2>&1 &
   DEV_PID=$!
   sleep 5
   node .claude/skills/new-aso-project/scripts/capture-project.mjs {slug} [lang]
   # → écrit /tmp/check-{slug}/*.png + /tmp/check-{slug}-grid.png
   kill $DEV_PID
   ```
   Ensuite **`Read /tmp/check-{slug}-grid.png`** pour voir la grille composite.

   Si l'app est multi-langue, lancer le script pour chaque lang :
   ```bash
   node .claude/skills/new-aso-project/scripts/capture-project.mjs flipia fr
   node .claude/skills/new-aso-project/scripts/capture-project.mjs flipia en
   ```

3. **Checklist visuelle à cocher** (avant de dire "c'est fini") :
   - [ ] Aucun texte coupé ou débordant
   - [ ] Device entièrement visible (aucune partie sous le bord inférieur)
   - [ ] Aucun device qui touche les bords gauche/droite du canvas
   - [ ] Breathing room clairement visible entre headline et device (tester : cacher le device, le headline ne doit pas paraître "scotché" au device)
   - [ ] Respiration en bas du canvas (quelques % d'espace vide sous le device)
   - [ ] 8 screens cohérents en proportions (même hauteur de text zone, même taille de device à l'œil)
   - [ ] Accent color DIFFÉRENT entre screens consécutifs (pas 3 rouges d'affilée)
   - [ ] Contrast headline/background suffisant (lisible au premier coup d'œil)
   - [ ] Pattern tilted : device ne dépasse pas les bords même rotation ≥ -25°
   - [ ] Pattern floating : cards positionnées à l'intérieur du canvas (pas coupées)

4. **Si un écran rate un critère** : retourner étape 7, corriger, re-capturer. Ne pas passer à l'export tant que les 10 checkbox ne sont pas tous validés.

5. **Donner l'URL de preview** une fois validé :
   `http://localhost:3000/projects/{slug}` (miniatures + switcher si i18n).

### Étape 9 — Export

Si l'utilisateur demande l'export :
- Via UI : bouton "Export" → popover avec sélection screenshots/formats/langues
- Via CLI :
   ```bash
   curl -N -X POST http://localhost:3000/api/export \
     -H "Content-Type: application/json" \
     -d '{"project":"{slug}","langs":["fr","en"]}'
   ```
- Résultat : `exports/{slug}/{lang}/{appstore|playstore}/{format-id}/{screenshot}.png`

## Garde-fous

### Layout / mise en page (règles critiques — source de 80% des retours négatifs)

- **TOUJOURS** créer `projects/{slug}/components/Layout.tsx` (étape 6) et l'utiliser dans chaque screen avec device
- **NE JAMAIS** dupliquer la structure `flex flex-col + padding` dans les screenshots — ça garantit des proportions incohérentes
- **NE JAMAIS** utiliser `<SplitLayout>` de `@/components/aso` en `direction="vertical"` pour un écran portrait — le device devient trop petit. Préférer le Layout custom du projet.
- **RESPECTER les valeurs de padding** validées : `pt-[9%]` text zone, `pt-[7%] pb-[9%] px-[8%]` device zone. Ne pas improviser.
- **RESPECTER les tailles typo validées** : `text-[9.5rem]` pour écrans avec device, `text-[11rem]` pour écrans sans device (hero, CTA)
- Tilted pattern : rotation **maximale de -20°**, avec `filter: drop-shadow(...)`. Au-delà, le device déborde.
- Floating cards : positionner avec offsets **relatifs au device** (`-left-[14%]`, `-right-[14%]`), pas en absolu sur le canvas
- **Après génération** : TOUJOURS capturer les 8 screens via Puppeteer + `Read` le PNG/grille pour valider visuellement (étape 8, checklist obligatoire)

### Règles générales

- **Ne JAMAIS** créer de nouveau composant dans `components/aso/` — la lib est figée
- **Ne JAMAIS** importer shadcn ou lucide dans les screenshots (seulement `@/components/aso` + composants locaux du projet)
- **Ne JAMAIS** référencer un asset via `/projects/...` direct — toujours `/api/assets/{slug}/{file}`
- **Ne JAMAIS** mettre des emojis dans un SVG/PNG placeholder — Sharp les rend en noir. Si emojis nécessaires, faire un mockup HTML (étape 4B).
- Vérifier que le slug ne contient que `[a-zA-Z0-9._-]` (project-loader rejette les autres)
- Utiliser `next/font/google` pour les polices — jamais d'`@import` CSS
- Vérifier que `next.config.ts` a `devIndicators: false` (sinon badge "N" pollue les exports)

## Cas d'usage réel : Flipia

Le projet `projects/flipia/` est une **référence d'implémentation complète** qui combine :
- `i18n.tsx` avec FR + EN
- `components/GameMockup.tsx` — mockup HTML riche (cartes memory, HUD joueurs, bouton Tornade)
- `components/Layout.tsx` — wrapper custom avec tailles optimisées
- Polices custom (Fredoka + Nunito) via next/font
- 8 screenshots qui varient les accents colorés (rouge/orange/bleu/vert)
- Device frame override pour un look rectangulaire

Lire ce projet comme référence avant d'attaquer une app avec besoins similaires.

## Détails

- [references/brief-template.md](references/brief-template.md) — Structure exacte du brief ASO
- [references/patterns-guide.md](references/patterns-guide.md) — Matching brief → template à choisir
- [references/advanced-patterns.md](references/advanced-patterns.md) — Mockup HTML, i18n, polices custom
