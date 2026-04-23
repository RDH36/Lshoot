# ASO Brief — Template

Structure attendue du brief fourni par l'utilisateur. L'utilisateur peut fournir ça sous forme
de fichier Markdown, JSON, ou freeform dans le chat. Ton rôle : extraire ces champs.

Les briefs vivent typiquement dans `/aso-project/{slug}/` (gitignored), avec deux fichiers :
- `aso.md` — stratégie ASO complète (titre, description, keywords, visuels)
- `aso-screenshots.md` — spec détaillée des 8 screenshots (headline + sub + capture par écran)

## Champs obligatoires

| Champ | Exemple | Notes |
|-------|---------|-------|
| `name` | `Focus Timer` | Nom commercial de l'app tel qu'affiché dans le store |
| `slug` | `focus-timer` | kebab-case auto-généré depuis `name` |
| `bundleId` | `com.bubble-go.focustimer` | Format Apple : reverse-DNS (Zod regex `^[a-zA-Z0-9._-]+$`) |
| `valueProp` | `Finir ce qu'on commence, 25 minutes à la fois.` | 1 phrase max 12 mots — **devient le headline du 01** |
| `audience` | `Étudiants et freelances avec du mal à rester concentrés` | Informe le tone et le vocabulaire |

## Champs recommandés

| Champ | Exemple | Notes |
|-------|---------|-------|
| `features` | Array de 3-5 objets `{headline, subheadline}` | Chaque feature = 1 screenshot |
| `brandColors` | `{ primary: "#6366f1", secondary: "#ec4899", accent: "#34d399" }` | Hex. Utilisés dans les gradients/solids/accents |
| `tone` | `playful` / `premium` / `dev` / `wellness` / `saas` | Oriente le choix des templates |
| `languages` | `["fr", "en"]` | Active i18n.tsx + switcher + export multi-lang |
| `cta` | `Télécharger gratuitement` | Texte du bouton sur le CTA final |

## Champs optionnels

| Champ | Exemple | Notes |
|-------|---------|-------|
| `appStoreId` | `1234567890` | |
| `playStoreId` | `com.bubble-go.focustimer` | |
| `darkMode` | `true` | Utiliser palette sombre sur certains screens |
| `defaultDeviceFrame` | `iphone-15-pro` \| `iphone-15` \| `android-phone` | |
| `sourceCodePath` | `/home/raymond/.../my-app` | **Critique** : si fourni, lis `tailwind.config.js` / `app.json` / un component home pour extraire la vraie charte (fonts, couleurs, patterns d'UI) |
| `customFonts` | `{ display: "Fredoka", body: "Nunito" }` | Polices Google Fonts à ajouter via `next/font/google` dans `app/layout.tsx` |
| `mockupStrategy` | `png` \| `html` | `html` = écrire un React mockup dans `projects/{slug}/components/` ; `png` = placeholders assets classiques |

## Exemple de brief complet

```markdown
# Focus Timer — ASO Brief

## App
- Name: Focus Timer
- Bundle: com.bubble-go.focustimer
- Languages: [fr, en]
- Source code: ~/Documents/project/focus-timer

## Value prop
Finir ce qu'on commence, 25 minutes à la fois.

## Audience
Étudiants et freelances qui procrastinent, veulent des sessions Pomodoro simples
sans gamification lourde.

## Brand (extraire du tailwind.config.js si source fournie)
- Primary: #6366f1 (indigo)
- Accent: #34d399 (green mint)
- Tone: premium minimalist
- Fonts: Inter (display + body)

## Features
1. **Sessions en 1 tap** — "Timer prêt en 2 secondes"
2. **Statistiques claires** — "Visualise ton temps concentré"
3. **Mode focus système** — "Bloque tes notifs automatiquement"
4. **Historique exportable** — "Ton temps, tes données"

## CTA
Démarrer gratuitement
```

## Normalisations (quand le brief est incomplet)

- Si `slug` manquant → kebab-case de `name` (`Focus Timer` → `focus-timer`)
- Si `brandColors` manquant → gradient par défaut (`#6366f1` → `#ec4899`)
- Si `tone` manquant → `saas` (workhorse)
- Si `cta` manquant → `Télécharger` (ou `Download` si language=en)
- Si `languages` manquant → pas de i18n, un seul rendu (défaut langue du brief)
- Si `features.length < 3` → demander à l'utilisateur de compléter, ou générer seulement 4-5 screenshots au lieu de 8
- Si `mockupStrategy` manquant → `png` (simple) par défaut ; passer à `html` si le rendu intérieur doit être montré en détail (ex : jeu, dashboard)

## Workflow d'extraction depuis le code source

Si `sourceCodePath` est fourni :

1. **Lire `{sourceCodePath}/tailwind.config.js`** → extraire `theme.extend.colors` et `theme.extend.fontFamily`
2. **Lire `{sourceCodePath}/app.json` ou `package.json`** → confirmer le nom et bundleId
3. **Lire 1-2 components clés** (ex : `components/home/ModeCard.tsx`) → comprendre le style UI (arrondis, ombres, tailles de typo, usage emoji)
4. **Reproduire ces patterns** dans le mockup HTML (étape 4B du workflow principal)
