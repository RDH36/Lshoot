"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  languages: string[];
  current: string;
};

export function LanguageSwitcher({ languages, current }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setLang = (lang: string) => {
    const params = new URLSearchParams(searchParams);
    if (lang === languages[0]) {
      params.delete("lang");
    } else {
      params.set("lang", lang);
    }
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border p-1 bg-background">
      {languages.map((lang) => {
        const active = lang === current;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLang(lang)}
            className={`px-3 py-1 text-xs font-medium rounded uppercase tracking-wider transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
