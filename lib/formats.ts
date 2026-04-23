// Source: developer.apple.com/app-store/resources + support.google.com/googleplay/android-developer
// Verified: 2026-04-22. Apple/Google updent ces specs, vérifier si les stores refusent des uploads.

export type Store = "appstore" | "playstore";

export type ScreenshotFormat = {
  id: string;
  store: Store;
  label: string;
  width: number;
  height: number;
  required: boolean;
  orientation: "portrait" | "landscape";
};

export const FORMATS: ScreenshotFormat[] = [
  {
    id: "iphone-6.9",
    store: "appstore",
    label: 'iPhone 6.9"',
    width: 1320,
    height: 2868,
    required: true,
    orientation: "portrait",
  },
  {
    id: "iphone-6.7",
    store: "appstore",
    label: 'iPhone 6.7"',
    width: 1290,
    height: 2796,
    required: true,
    orientation: "portrait",
  },
  {
    id: "iphone-6.5",
    store: "appstore",
    label: 'iPhone 6.5"',
    width: 1242,
    height: 2688,
    required: false,
    orientation: "portrait",
  },
  {
    id: "iphone-5.5",
    store: "appstore",
    label: 'iPhone 5.5"',
    width: 1242,
    height: 2208,
    required: false,
    orientation: "portrait",
  },
  {
    id: "ipad-13",
    store: "appstore",
    label: 'iPad Pro 13"',
    width: 2064,
    height: 2752,
    required: true,
    orientation: "portrait",
  },
  {
    id: "ipad-12.9",
    store: "appstore",
    label: 'iPad Pro 12.9"',
    width: 2048,
    height: 2732,
    required: true,
    orientation: "portrait",
  },
  {
    id: "phone",
    store: "playstore",
    label: "Android Phone",
    width: 1080,
    height: 1920,
    required: true,
    orientation: "portrait",
  },
  {
    id: "tablet-7",
    store: "playstore",
    label: 'Android Tablet 7"',
    width: 1200,
    height: 1920,
    required: false,
    orientation: "portrait",
  },
  {
    id: "tablet-10",
    store: "playstore",
    label: 'Android Tablet 10"',
    width: 1600,
    height: 2560,
    required: false,
    orientation: "portrait",
  },
];

export const FORMATS_BY_STORE: Record<Store, ScreenshotFormat[]> = {
  appstore: FORMATS.filter((f) => f.store === "appstore"),
  playstore: FORMATS.filter((f) => f.store === "playstore"),
};

export const REQUIRED_FORMATS: ScreenshotFormat[] = FORMATS.filter(
  (f) => f.required,
);

export function getFormat(id: string): ScreenshotFormat | undefined {
  return FORMATS.find((f) => f.id === id);
}
