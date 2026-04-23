// Dictionnaire i18n pour Flipia — supporte FR + EN
// L'accent color est passé au runtime par chaque screenshot (varie par écran)

import type { ReactNode } from "react";

export const LANGUAGES = ["fr", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];

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

type ScreenT = {
  headline: (accent: string) => ReactNode;
  sub: string;
};

type ScreenWithOpponentT = ScreenT & {
  opponentName: string;
  opponentAvatar: string;
  opponentSubtitle: string;
};

export type T = {
  ui: UiT;
  duel: ScreenT;
  tornado: ScreenT;
  modes: ScreenT;
  ranks: ScreenT;
  offline: ScreenWithOpponentT;
  friends: ScreenWithOpponentT;
  stats: ScreenT;
  daily: ScreenT;
};

const FR: T = {
  ui: {
    playerName: "Toi",
    playerSubtitle: "Joueur · 🌪",
    opponentName: "Alex",
    opponentSubtitle: "Joueur · En di...",
    pairsLabel: "PAIRES",
    tornadoTitle: "Tornade prête",
    tornadoSub: "Mélange les cartes non-matchées",
    tornadoButton: "LANCER",
  },
  duel: {
    headline: (c) => (
      <>
        Le memory
        <br />
        devient un <span style={{ color: c }}>duel</span>
      </>
    ),
    sub: "Affronte de vrais joueurs en ligne",
  },
  tornado: {
    headline: (c) => (
      <>
        Ton arme :
        <br />
        la <span style={{ color: c }}>Tornade</span>
      </>
    ),
    sub: "Mélange les cartes. Efface sa mémoire.",
  },
  modes: {
    headline: (c) => (
      <>
        3 façons
        <br />
        de <span style={{ color: c }}>jouer</span>
      </>
    ),
    sub: "Ranked · IA hors ligne · Entre amis",
  },
  ranks: {
    headline: (c) => (
      <>
        Grimpe du
        <br />
        Bronze au <span style={{ color: c }}>Maître</span>
      </>
    ),
    sub: "6 rangs · classement mondial",
  },
  offline: {
    headline: (c) => (
      <>
        Entraîne-toi
        <br />
        <span style={{ color: c }}>hors ligne</span>
      </>
    ),
    sub: "3 IA : du distrait à l'imbattable",
    opponentName: "AlphaMemory",
    opponentAvatar: "🤖",
    opponentSubtitle: "IA · Imbattable",
  },
  friends: {
    headline: (c) => (
      <>
        Défie tes
        <br />
        <span style={{ color: c }}>amis</span>
      </>
    ),
    sub: "Crée une room, partage le code, jouez",
    opponentName: "Lucas",
    opponentAvatar: "👾",
    opponentSubtitle: "Ami · Prêt",
  },
  stats: {
    headline: (c) => (
      <>
        Mesure tes
        <br />
        <span style={{ color: c }}>progrès</span>
      </>
    ),
    sub: "92% précision · streak 8 · 1.4s par paire",
  },
  daily: {
    headline: (c) => (
      <>
        Récompense
        <br />
        chaque <span style={{ color: c }}>jour</span>
      </>
    ),
    sub: "+15 XP gratuits · boost x1.5 disponible",
  },
};

const EN: T = {
  ui: {
    playerName: "You",
    playerSubtitle: "Player · 🌪",
    opponentName: "Alex",
    opponentSubtitle: "Player · Online",
    pairsLabel: "PAIRS",
    tornadoTitle: "Tornado ready",
    tornadoSub: "Shuffles unmatched cards",
    tornadoButton: "LAUNCH",
  },
  duel: {
    headline: (c) => (
      <>
        Memory just got
        <br />
        <span style={{ color: c }}>competitive</span>
      </>
    ),
    sub: "Face real players online",
  },
  tornado: {
    headline: (c) => (
      <>
        Your secret
        <br />
        weapon: <span style={{ color: c }}>Tornado</span>
      </>
    ),
    sub: "Shuffle the cards. Wipe their memory.",
  },
  modes: {
    headline: (c) => (
      <>
        3 ways
        <br />
        to <span style={{ color: c }}>play</span>
      </>
    ),
    sub: "Ranked · Offline AI · With friends",
  },
  ranks: {
    headline: (c) => (
      <>
        Climb from
        <br />
        Bronze to <span style={{ color: c }}>Master</span>
      </>
    ),
    sub: "6 ranks · global live leaderboard",
  },
  offline: {
    headline: (c) => (
      <>
        Train
        <br />
        <span style={{ color: c }}>offline</span>
      </>
    ),
    sub: "3 AI levels: distracted to unbeatable",
    opponentName: "AlphaMemory",
    opponentAvatar: "🤖",
    opponentSubtitle: "AI · Unbeatable",
  },
  friends: {
    headline: (c) => (
      <>
        Challenge
        <br />
        your <span style={{ color: c }}>friends</span>
      </>
    ),
    sub: "Create a room, share the code, play",
    opponentName: "Lucas",
    opponentAvatar: "👾",
    opponentSubtitle: "Friend · Ready",
  },
  stats: {
    headline: (c) => (
      <>
        Track your
        <br />
        <span style={{ color: c }}>progress</span>
      </>
    ),
    sub: "92% accuracy · streak 8 · 1.4s per pair",
  },
  daily: {
    headline: (c) => (
      <>
        Daily rewards
        <br />
        every <span style={{ color: c }}>day</span>
      </>
    ),
    sub: "+15 free XP · 1.5x boost available",
  },
};

const DICTS: Record<Lang, T> = { fr: FR, en: EN };

export function useT(lang?: string): T {
  return DICTS[lang as Lang] ?? FR;
}
