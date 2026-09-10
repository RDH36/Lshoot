// i18n dict for example-app — reference templates in EN + FR

import type { ReactNode } from "react";

export const LANGUAGES = ["en", "fr"] as const;
export type Lang = (typeof LANGUAGES)[number];

type ScreenT = {
  headline: (accent: string) => ReactNode;
  sub: string;
};

type FloatingCardT = {
  emoji: string;
  label: string;
  sub: string;
};

type MockT = {
  date: string;
  greeting: string;
  streak: string;
  days: string;
  best: string;
  today: string;
  seeAll: string;
  habits: { emoji: string; name: string; meta: string }[];
};

export type T = {
  mock: MockT;
  hero: ScreenT;
  features: ScreenT;
  split: ScreenT;
  tilted: ScreenT;
  minimalist: ScreenT;
  floating: ScreenT & { cards: FloatingCardT[] };
  dark: ScreenT;
  cta: ScreenT & { button: string; rating: string; stores: [string, string] };
};

const EN: T = {
  mock: {
    date: "Tuesday, March 12",
    greeting: "Good morning, Alex 👋",
    streak: "Current streak",
    days: "days",
    best: "Best: 21 days",
    today: "Today",
    seeAll: "See all",
    habits: [
      { emoji: "💧", name: "Drink water", meta: "6 / 8 glasses" },
      { emoji: "🏃", name: "Morning run", meta: "5 km · 28 min" },
      { emoji: "📖", name: "Read 20 pages", meta: "Atomic Habits" },
      { emoji: "🧘", name: "Meditate", meta: "10 min · 7:30" },
      { emoji: "🌙", name: "Sleep by 11pm", meta: "Tonight" },
    ],
  },
  hero: {
    headline: (c) => (
      <>
        Build habits
        <br />
        that <span style={{ color: c }}>stick</span>
      </>
    ),
    sub: "5 minutes a day to transform your routine",
  },
  features: {
    headline: (c) => (
      <>
        Everything in
        <br />
        <span style={{ color: c }}>one place</span>
      </>
    ),
    sub: "Notes, tasks, and reminders in a single app",
  },
  split: {
    headline: (c) => (
      <>
        Track what
        <br />
        <span style={{ color: c }}>matters</span>
      </>
    ),
    sub: "Visualize progress day by day",
  },
  tilted: {
    headline: (c) => (
      <>
        Designed
        <br />
        for <span style={{ color: c }}>focus</span>
      </>
    ),
    sub: "Every detail, crafted with care",
  },
  minimalist: {
    headline: (c) => (
      <>
        Less noise.
        <br />
        More <span style={{ color: c }}>flow.</span>
      </>
    ),
    sub: "Quiet interface, deep work",
  },
  floating: {
    headline: (c) => (
      <>
        Everything
        <br />
        you <span style={{ color: c }}>need</span>
      </>
    ),
    sub: "Fast, private, reliable",
    cards: [
      { emoji: "⚡", label: "Fast", sub: "Opens in < 1s" },
      { emoji: "🔒", label: "Private", sub: "End-to-end encrypted" },
      { emoji: "🎯", label: "Focused", sub: "No dark patterns" },
    ],
  },
  dark: {
    headline: (c) => (
      <>
        Built for
        <br />
        <span style={{ color: c }}>power users</span>
      </>
    ),
    sub: "Keyboard-first. Lightning-fast.",
  },
  cta: {
    headline: (c) => (
      <>
        Ready to
        <br />
        <span style={{ color: c }}>start?</span>
      </>
    ),
    sub: "Free. No credit card.",
    button: "Download now",
    rating: "4.9 · 12k ratings",
    stores: ["App Store", "Google Play"],
  },
};

const FR: T = {
  mock: {
    date: "Mardi 12 mars",
    greeting: "Bonjour Alex 👋",
    streak: "Série en cours",
    days: "jours",
    best: "Record : 21 jours",
    today: "Aujourd'hui",
    seeAll: "Tout voir",
    habits: [
      { emoji: "💧", name: "Boire de l'eau", meta: "6 / 8 verres" },
      { emoji: "🏃", name: "Course matinale", meta: "5 km · 28 min" },
      { emoji: "📖", name: "Lire 20 pages", meta: "Atomic Habits" },
      { emoji: "🧘", name: "Méditer", meta: "10 min · 7h30" },
      { emoji: "🌙", name: "Dormir avant 23h", meta: "Ce soir" },
    ],
  },
  hero: {
    headline: (c) => (
      <>
        Des habitudes
        <br />
        qui <span style={{ color: c }}>tiennent</span>
      </>
    ),
    sub: "5 minutes par jour pour transformer ta routine",
  },
  features: {
    headline: (c) => (
      <>
        Tout au
        <br />
        <span style={{ color: c }}>même endroit</span>
      </>
    ),
    sub: "Notes, tâches et rappels dans une seule app",
  },
  split: {
    headline: (c) => (
      <>
        Suis ce qui
        <br />
        <span style={{ color: c }}>compte</span>
      </>
    ),
    sub: "Visualise ta progression jour après jour",
  },
  tilted: {
    headline: (c) => (
      <>
        Pensé pour la
        <br />
        <span style={{ color: c }}>concentration</span>
      </>
    ),
    sub: "Chaque détail, pensé avec soin",
  },
  minimalist: {
    headline: (c) => (
      <>
        Moins de bruit.
        <br />
        Plus de <span style={{ color: c }}>flow.</span>
      </>
    ),
    sub: "Interface discrète, focus profond",
  },
  floating: {
    headline: (c) => (
      <>
        Tout ce qu'il
        <br />
        te <span style={{ color: c }}>faut</span>
      </>
    ),
    sub: "Rapide, privé, fiable",
    cards: [
      { emoji: "⚡", label: "Rapide", sub: "Ouverture < 1s" },
      { emoji: "🔒", label: "Privé", sub: "Chiffré de bout en bout" },
      { emoji: "🎯", label: "Focus", sub: "Zéro dark pattern" },
    ],
  },
  dark: {
    headline: (c) => (
      <>
        Pensé pour les
        <br />
        <span style={{ color: c }}>power users</span>
      </>
    ),
    sub: "Clavier d'abord. Ultra rapide.",
  },
  cta: {
    headline: (c) => (
      <>
        Prêt à
        <br />
        <span style={{ color: c }}>commencer ?</span>
      </>
    ),
    sub: "Gratuit. Sans carte bancaire.",
    button: "Télécharger",
    rating: "4,9 · 12k avis",
    stores: ["App Store", "Google Play"],
  },
};

const DICTS: Record<Lang, T> = { en: EN, fr: FR };

export function useT(lang?: string): T {
  return DICTS[lang as Lang] ?? EN;
}
