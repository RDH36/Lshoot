// Template: Tilted Device 3D — uses ExampleLayout with a wrapped tilted mockup
import { AppMockup, GradientBackground, Subheadline } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { useT } from "../i18n";

const ACCENT = "#b45309";

export default function Tilted({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#78350f"
      background={
        <GradientBackground
          from="#fef3c7"
          via="#fde68a"
          to="#fbbf24"
          direction="to-br"
        />
      }
      headline={
        <h1 className="text-[9.5rem] font-black leading-[0.9] tracking-tight">
          {t.tilted.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <Subheadline size="lg" color="#92400e">
          {t.tilted.sub}
        </Subheadline>
      }
      mockup={
        <div
          className="h-full"
          style={{ perspective: "1800px" }}
        >
          <div
            className="h-full"
            style={{
              transform: "rotateY(-20deg) rotateX(6deg) rotateZ(-3deg)",
              filter: "drop-shadow(20px 40px 50px rgba(120, 53, 15, 0.4))",
            }}
          >
            <AppMockup
              src="/api/assets/example-app/home.png"
              device="iphone-15-pro"
            />
          </div>
        </div>
      }
    />
  );
}
