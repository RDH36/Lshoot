# Advanced Patterns — Mockup HTML, i18n, polices custom

Patterns tirés du projet `projects/flipia/` (référence d'implémentation avancée).
À utiliser quand le brief demande un rendu fidèle à la vraie app, une localisation multi-langue,
ou l'intégration de polices custom.

---

## 1. Mockup HTML en React (vs PNG placeholder)

### Quand l'utiliser

Choisir mockup HTML si :
- L'app a un UI iconique à mettre en valeur (jeu, dashboard, graphe, carte)
- Les emojis couleur doivent rester couleur (Sharp/SVG les rend noir — seul Chromium les rend en couleur)
- Le contenu doit être localisable dans plusieurs langues
- Le user veut pouvoir itérer rapidement sur le look du mockup (pas recapturer à chaque changement)

Sinon (app classique, captures Xcode déjà faites) : mockup PNG via `<AppMockup src="...">` suffit.

### Pattern

**Fichier** : `projects/{slug}/components/{Nom}Mockup.tsx`

**Principes** :
- Composant pur React + Tailwind — pas de `"use client"`, pas d'état
- TOUS les strings utilisateur passent par des props (pour i18n)
- Le composant remplit `w-full h-full` (il sera placé dans un DeviceFrame)
- Utiliser les vraies couleurs de l'app (extraites du `tailwind.config.js`)
- Utiliser les emojis Unicode directement (Chromium rend en couleur par défaut)

**Exemple minimal** :
```tsx
// projects/flipia/components/GameMockup.tsx

type Props = {
  playerName?: string;
  opponentName?: string;
  pairsLabel?: string;         // localisable
  tornadoTitle?: string;
  tornadoButton?: string;
  // ... beaucoup de props texte
};

export function GameMockup({
  playerName = "Toi",
  opponentName = "Alex",
  pairsLabel = "PAIRES",
  tornadoTitle = "Tornade prête",
  tornadoButton = "LANCER",
}: Props) {
  return (
    <div
      className="w-full h-full bg-[#FAF1F1] flex flex-col p-[6%]"
      style={{ fontFamily: "var(--font-fredoka), sans-serif" }}
    >
      {/* Ton UI détaillé ici : cards, avatars, buttons, etc. */}
    </div>
  );
}
```

**Utilisation dans un screenshot** :
```tsx
import { DeviceFrame } from "@/components/aso";
import { GameMockup } from "../components/GameMockup";

<DeviceFrame variant="iphone-15-pro" className="h-full w-auto">
  <GameMockup />
</DeviceFrame>
```

### Extraire l'UI réel de l'app source

Si `sourceCodePath` est fourni dans le brief :

1. `{sourceCodePath}/tailwind.config.js` → palette + fontFamily
2. `{sourceCodePath}/app.json` ou `package.json` → nom + bundle
3. Lire 1-2 components représentatifs (ex : `components/home/ModeCard.tsx`, `components/game/PlayerHUD.tsx`)
4. Reproduire le style : mêmes arrondis, mêmes couleurs, même hiérarchie visuelle

**Ne pas copier du code React Native** — adapter en HTML/Tailwind web (Next.js Image au lieu de expo-image, div au lieu de View, etc.).

---

## 2. i18n multi-langues

### Fichier `projects/{slug}/i18n.tsx`

Structure obligatoire :

```tsx
import type { ReactNode } from "react";

export const LANGUAGES = ["fr", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];

// Strings du mockup intérieur (pour {...t.ui} spread)
type UiT = {
  playerName: string;
  playerSubtitle: string;
  opponentName: string;
  opponentSubtitle: string;
  pairsLabel: string;
  tornadoTitle: string;
  tornadoSub: string;
  tornadoButton: string;
};

// Texte d'un screenshot : headline (fonction pour recevoir la couleur accent) + sub
type ScreenT = {
  headline: (accent: string) => ReactNode;
  sub: string;
};

// Variante pour screens avec opponent spécifique (ex : offline → IA, friends → ami)
type ScreenWithOpponentT = ScreenT & {
  opponentName: string;
  opponentAvatar: string;
  opponentSubtitle: string;
};

export type T = {
  ui: UiT;
  duel: ScreenT;
  tornado: ScreenT;
  // ... un champ par screenshot (nom court)
};

const FR: T = { ui: { ... }, duel: { headline: (c) => <>…</>, sub: "…" }, /* … */ };
const EN: T = { ui: { ... }, duel: { headline: (c) => <>…</>, sub: "…" }, /* … */ };

const DICTS: Record<Lang, T> = { fr: FR, en: EN };

export function useT(lang?: string): T {
  return DICTS[lang as Lang] ?? FR;
}
```

### Chaque screenshot accepte `{ lang?: string }`

```tsx
import { useT } from "../i18n";

const ACCENT = "#A2340A";    // couleur accent — varie par écran

export default function Duel({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <FlipiaLayout
      headline={
        <h1 className="text-[11rem] font-bold leading-[0.9] tracking-tight text-[#1A1C17]">
          {t.duel.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <p
          className="text-[3.2rem] font-normal text-[#474553]"
          style={{ fontFamily: "var(--font-nunito), sans-serif" }}
        >
          {t.duel.sub}
        </p>
      }
      mockup={
        <DeviceFrame variant="iphone-15-pro" className="h-full w-auto">
          <GameMockup {...t.ui} />
        </DeviceFrame>
      }
    />
  );
}
```

### Déclarer dans config.json

```json
{
  "name": "Flipia",
  "bundleId": "com.rdh36.flipia",
  "languages": ["fr", "en"]
}
```

### Infrastructure déjà en place

- `app/preview/[project]/[screenshot]/page.tsx` lit `?lang=` et passe au composant
- `app/projects/[project]/page.tsx` affiche un switcher FR/EN si `languages` présent
- `POST /api/export` avec `{ langs: ["fr", "en"] }` exporte les 2 langues en parallèle
- Chaque langue écrit dans `exports/{slug}/{lang}/...`

Tu n'as **rien à modifier** dans `lib/` ou `app/` — juste créer `i18n.tsx` + mettre `languages` dans config.

---

## 3. Polices custom via next/font/google

### Modifier `app/layout.tsx`

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

// Dans <html className={...}> ajouter :
// ${fredoka.variable} ${nunito.variable}
```

### Utiliser dans les screenshots

```tsx
<h1 style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>
  Mon titre
</h1>
```

Ou plus souvent : tout le screenshot wrappé :
```tsx
<div className="w-full h-full" style={{ fontFamily: "var(--font-fredoka)" }}>
  {/* tous les enfants héritent */}
</div>
```

### Règles

- **Toujours** via `next/font/google` — jamais `@import` CSS ni `<link>` dans head
- Les variables CSS (`--font-*`) sont la seule façon propre de référencer les polices
- `weight` : ne lister que les poids réellement utilisés (évite de charger 400/500/600/700/800/900 inutiles)
- Pour une police non-Google : utiliser `next/font/local` avec un fichier `.woff2` local

---

## 4. Layout custom par projet

Pour avoir des tailles/spacings cohérents entre les 8 screenshots, créer un Layout dédié.

**Pattern** : `projects/{slug}/components/Layout.tsx`

```tsx
import type { ReactNode } from "react";
import { DeviceFrame } from "@/components/aso";
import { GameMockup } from "./GameMockup";

type Props = {
  headline: ReactNode;
  subheadline?: ReactNode;
  bg?: string;
  mockup?: ReactNode;   // optionnel — si omis, GameMockup par défaut
};

export function FlipiaLayout({ headline, subheadline, bg = "#FAF1F1", mockup }: Props) {
  return (
    <div
      className="w-full h-full flex flex-col items-center"
      style={{ background: bg, fontFamily: "var(--font-fredoka), sans-serif" }}
    >
      <div className="pt-[6%] px-[5%] text-center">
        {headline}
        {subheadline ? <div className="mt-[2%]">{subheadline}</div> : null}
      </div>
      <div className="flex-1 flex items-center justify-center w-full px-[3%] pt-[7%] pb-[4%] min-h-0">
        <div className="h-full">
          {mockup ?? (
            <DeviceFrame
              variant="iphone-15-pro"
              className="h-full w-auto !rounded-[7%] !p-[2%]"
              screenClassName="!rounded-[5%]"
            >
              <GameMockup />
            </DeviceFrame>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Tailles typographiques validées

Testées sur canvas 1080×1920 (Play Store phone, équivalent iPhone 6.5") :
- Headline : `text-[11rem] font-bold leading-[0.9] tracking-tight`
- Subheadline : `text-[3.2rem] font-normal leading-snug`
- Pour canvas 1290×2796 (iPhone 6.7") : idem, Tailwind scale automatiquement via `ScreenshotCanvas` qui fixe les dimensions

### Override du device frame

Pour un look plus rectangulaire / moins rounded (plus pro) :
```tsx
<DeviceFrame
  variant="iphone-15-pro"
  className="h-full w-auto !rounded-[7%] !p-[2%]"
  screenClassName="!rounded-[5%]"
/>
```

Les `!` Tailwind forcent la classe à battre les défauts (`rounded-[12%]`, `p-[3%]`).

---

## 5. Checklist d'un projet avancé complet

Avant de marquer un projet "ready to export", vérifier :

- [ ] `config.json` avec `languages` si multi-lang
- [ ] `i18n.tsx` avec au moins FR + EN si multi-lang
- [ ] `components/Layout.tsx` custom avec tailles testées
- [ ] `components/{Nom}Mockup.tsx` si mockup HTML
- [ ] Polices custom ajoutées dans `app/layout.tsx` si app a sa propre typo
- [ ] 6-8 screenshots qui varient les accents colorés (pas tous le même)
- [ ] `pnpm build` passe sans warning
- [ ] Preview `/preview/{slug}/01-...` rend correctement en FR et en EN
- [ ] Page projet `/projects/{slug}` affiche les miniatures + switcher langue
- [ ] Export test en EN seul : `curl -X POST /api/export -d '{"project":"X","langs":["en"]}'`
