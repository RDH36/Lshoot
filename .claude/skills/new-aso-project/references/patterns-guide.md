# Patterns Guide — Quel template pour quel type d'app

Mapping entre le brief utilisateur et le choix des 8 templates de référence
(`projects/example-app/screenshots/01-hero.tsx` → `08-cta.tsx`).

## Les 8 templates de base

| # | Template | Pattern | Composants utilisés |
|---|----------|---------|---------------------|
| 1 | `01-hero.tsx` | Hero + Bold Typography | GradientBackground + Headline + Subheadline |
| 2 | `02-features.tsx` | Device Center + Headline Above | CenteredLayout + AppMockup + Headline |
| 3 | `03-split.tsx` | Split Layout vertical | SolidBackground + SplitLayout + AppMockup |
| 4 | `04-tilted.tsx` | Tilted Device 3D | GradientBackground + CSS transform perspective |
| 5 | `05-minimalist.tsx` | Minimalist + Whitespace | SolidBackground clair + Headline + petit AppMockup |
| 6 | `06-floating.tsx` | Floating UI Callouts | GradientBackground + AppMockup + divs absolus |
| 7 | `07-dark.tsx` | Dark SaaS | SolidBackground sombre + glow shadow |
| 8 | `08-cta.tsx` | Call to Action | GradientBackground + Headline + "bouton" blanc |

## Structure recommandée (8 screenshots)

```
01  Hero              → value prop (obligatoire en 1er)
02  Device Center     → feature #1 (workhorse)
03  Split             → feature #2
04  Tilted            → feature #3 (feature visuellement impressionnante)
05  Minimalist ou Dark → variant selon le tone
06  Floating          → feature avec annotations multiples
07  Device Center     → feature #4 ou "before/after"
08  CTA               → conversion finale (obligatoire en dernier)
```

Si < 5 features → réduire à 5-6 screenshots en gardant `01-hero` + `08-cta`.

## Matching par tone

### `playful` (Duolingo, Headspace, Flipia)
- Palettes : couleurs vives OU beige + accents (rouge/bleu/vert/violet)
- Fonts : rondes type Fredoka, Nunito
- Templates prioritaires : 01-hero, 02-centered, 06-floating, 08-cta
- Headlines : courts, emojis OK dans callouts (⚡ 🎯 ✨)

### `premium` (Calm, Notion, Linear)
- Palettes : sombre/neutre + 1 accent
- Templates prioritaires : 01-hero, 05-minimalist, 07-dark, 03-split
- Headlines : sobres, pas d'emoji, typo "raffinée"

### `dev` (Superhuman, Linear, Raycast)
- Palettes : noir + accent coloré (violet, bleu néon)
- Templates prioritaires : 07-dark, 01-hero (dark), 03-split, 02-centered
- Headlines : direct, "Shipping is un sport" style

### `wellness` (Calm, Headspace, Oak)
- Palettes : soft pastels, blanc cassé
- Templates prioritaires : 05-minimalist, 01-hero (soft), 08-cta
- Headlines : poétiques, "Less app. More life."

### `saas` (défaut — Notion, Figma, Linear)
- Palettes : gradient brand color
- Templates prioritaires : toute la séquence standard
- Headlines : action verbs, features concrètes

## Pattern Layout tight (recommandé pour apps avec mockup HTML)

Pour les projets avec un mockup React riche (comme Flipia), créer un `Layout.tsx` local :

```tsx
// projects/{slug}/components/Layout.tsx
export function AppNameLayout({ headline, subheadline, mockup, bg = "#FAF1F1" }) {
  return (
    <div className="w-full h-full flex flex-col items-center"
         style={{ background: bg, fontFamily: "var(--font-display), sans-serif" }}>
      <div className="pt-[6%] px-[5%] text-center">
        {headline}
        {subheadline ? <div className="mt-[2%]">{subheadline}</div> : null}
      </div>
      <div className="flex-1 flex items-center justify-center w-full px-[3%] pt-[7%] pb-[4%] min-h-0">
        <div className="h-full">{mockup}</div>
      </div>
    </div>
  );
}
```

**Tailles de typo validées sur canvas 1080×1920 (Play Store phone)** :
- Headline : `text-[11rem] font-bold leading-[0.9] tracking-tight`
- Subheadline : `text-[3.2rem] font-normal leading-snug`

**Device frame rectangulaire** (moins d'arrondi = plus pro) :
```tsx
<DeviceFrame
  variant="iphone-15-pro"
  className="h-full w-auto !rounded-[7%] !p-[2%]"
  screenClassName="!rounded-[5%]"
/>
```

## Couleurs : varier entre screenshots

**Règle critique** : chaque screenshot doit avoir un **accent color différent**. Ne pas mettre
tous les headlines dans la même couleur — ça fait monotone en miniature sur la page store.

Exemple Flipia (8 screenshots, 4 couleurs alternées) :
- 01 duel → `#A2340A` rouge (combat)
- 02 tornade → `#f59e0b` orange (énergie)
- 03 modes → `#5DA9FE` bleu (fun)
- 04 rangs → `#1D9E75` vert (achievement)
- 05 hors ligne → `#A2340A` rouge
- 06 amis → `#5DA9FE` bleu
- 07 progrès → `#1D9E75` vert
- 08 récompense → `#f59e0b` orange

La palette vient du brief (`brandColors`) ou de l'app source (`tailwind.config.js`).

## Adapter les couleurs dans les composants

### Gradients (02, 04, 06, 08)
```tsx
<GradientBackground
  from={brandColors.primary}
  via={brandColors.secondary}
  to={brandColors.accent}
  direction="to-br"
/>
```

### Solids (01, 03, 05, 07)
```tsx
<SolidBackground color={brandColors.primary} />    // vif
<SolidBackground color="#FAF1F1" />                 // light (Flipia style)
<SolidBackground color="#09090b" />                 // dark
```

### Text colors
- Sur light bg : headline `#1A1C17` (noir chaud), subheadline `#474553` (gris)
- Sur dark bg : headline `#ffffff`, subheadline `#cbd5e1` / `#a5b4fc`
- Accent word : `<span style={{ color: accentColor }}>mot</span>`

## Headlines : règles de copywriting

- **01-hero** : `valueProp` du brief, reformulé en max 8 mots
- **Features** : headline = `features[n].headline`, subheadline = `features[n].subheadline`
- **08-cta** : `"Prêt à [action] ?"` ou `"Try [name] for free"` — impératif court
- **Power words** : "instant", "effortless", "proven", "live", "free" — à privilégier vs "great", "better"
- **Max 5-12 mots** par screenshot total (headline + sub)

## Adapter le device frame

Si l'app est mobile-only → toujours `iphone-15-pro`.
Si l'app est tablet-first → `ipad-13` dans au moins 1 screenshot.
Si l'app est Android-only → remplacer par `android-phone` (le bouton "Export all" couvre Apple + Google anyway).

## Exemple de plan complet

**Brief** : Focus Timer (Pomodoro), tone=premium, 4 features, langues=fr/en.

```
Layout     FlipiaLayout custom avec Inter font, bg #FAFAF9
i18n       i18n.tsx avec FR + EN
Mockup     PNG placeholder (app simple, pas besoin de HTML mockup)

01-hero       Hero + Typo          "Finir ce qu'on commence" / indigo gradient
02-tap        Device Center        Feature "Sessions en 1 tap"
03-stats      Split                Feature "Stats claires"
04-focus      Tilted               Feature "Mode focus système"
05-export     Minimalist           "Ton temps, ta data" (export — feature discrète)
06-floating   Floating             3 callouts : ⚡ Rapide · 🎯 Concentré · 📊 Suivi
08-cta        CTA                  "Démarrer gratuitement"
```

→ 7 screenshots (skip 07-dark car tone=premium ≠ dev).
