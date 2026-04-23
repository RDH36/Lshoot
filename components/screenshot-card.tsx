import Link from "next/link";

type Props = {
  project: string;
  screenshot: string;
  lang?: string;
};

const SCALE = 0.15;
const INVERSE = Math.round((1 / SCALE) * 100);

export function ScreenshotCard({ project, screenshot, lang }: Props) {
  const query = lang ? `?lang=${lang}` : "";
  return (
    <Link
      href={`/preview/${project}/${screenshot}${query}`}
      className="group relative block aspect-[9/19.5] rounded-md border overflow-hidden bg-neutral-100 hover:border-foreground/30 transition-colors"
      target="_blank"
    >
      <iframe
        src={`/preview/${project}/${screenshot}${query}`}
        className="absolute inset-0 origin-top-left pointer-events-none border-0"
        style={{
          transform: `scale(${SCALE})`,
          width: `${INVERSE}%`,
          height: `${INVERSE}%`,
        }}
        title={screenshot}
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 font-mono truncate">
        {screenshot}
      </div>
    </Link>
  );
}
