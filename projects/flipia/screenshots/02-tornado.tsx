// Template: Flipia tight — feature Tornade (real capture: tornade.png)
import { AppMockup } from "@/components/aso";
import { FlipiaLayout } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#f59e0b";

export default function Tornado({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <FlipiaLayout
      headline={
        <h1 className="text-[11rem] font-bold leading-[0.9] tracking-tight text-[#1A1C17]">
          {t.tornado.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <p
          className="text-[3.2rem] font-normal text-[#474553] leading-snug"
          style={{ fontFamily: "var(--font-nunito), sans-serif" }}
        >
          {t.tornado.sub}
        </p>
      }
      mockup={
        <AppMockup
          src="/api/assets/flipia/tornade.png"
          device="iphone-15-pro"
          className="!rounded-[7%] !p-[2%]"
          screenClassName="!rounded-[5%]"
        />
      }
    />
  );
}
