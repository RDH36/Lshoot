import { AUTHOR, GITHUB_URL, NPM_URL, SITE_NAME } from "@/lib/site";

export { AUTHOR, GITHUB_URL, NPM_URL };
export const BRAND = SITE_NAME;
export const INSTALL_CMD = "npx lshoot my-app";

export const T = {
  paper: "#F6F4EE",
  paper2: "#ECE8DF",
  ink: "#121212",
  ink2: "#15161A",
  muted: "#6F6A61",
  line: "#DCD7CB",
  accent: "#059669",
  accentBright: "#34D399",
} as const;

export const FONT = {
  display: "var(--font-bricolage), sans-serif",
  body: "var(--font-geist-sans), sans-serif",
  mono: "var(--font-geist-mono), monospace",
} as const;

export type ShowcaseItem = {
  src: string;
  width: number;
  height: number;
  app: string;
  format: string;
};

export const SHOWCASE: ShowcaseItem[] = [
  { src: "/showcase/lshoot-01s.webp", width: 480, height: 1043, app: "lshoot", format: "appstore/iphone-6.9" },
  { src: "/showcase/clearway-03.webp", width: 480, height: 1043, app: "clearway", format: "appstore/iphone-6.9" },
  { src: "/showcase/flipia-01.webp", width: 480, height: 1043, app: "flipia", format: "appstore/iphone-6.9" },
  { src: "/showcase/mitsitsy-01.webp", width: 480, height: 1043, app: "mitsitsy", format: "appstore/iphone-6.9" },
  { src: "/showcase/monster-cannon-01.webp", width: 480, height: 1043, app: "monster-cannon", format: "appstore/iphone-6.9" },
  { src: "/showcase/clearway-01.webp", width: 480, height: 1043, app: "clearway", format: "appstore/iphone-6.9" },
  { src: "/showcase/flipia-04.webp", width: 480, height: 1043, app: "flipia", format: "appstore/iphone-6.9" },
  { src: "/showcase/mitsitsy-03.webp", width: 480, height: 1043, app: "mitsitsy", format: "appstore/iphone-6.9" },
  { src: "/showcase/monster-cannon-03.webp", width: 480, height: 1043, app: "monster-cannon", format: "appstore/iphone-6.9" },
];

export const HERO_RENDER: ShowcaseItem = {
  src: "/showcase/lshoot-01.webp",
  width: 720,
  height: 1564,
  app: "lshoot",
  format: "appstore/iphone-6.9",
};
