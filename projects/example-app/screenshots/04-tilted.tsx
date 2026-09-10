// Template: Tilted Device 3D — perspective + long shadow, warm palette
import { DeviceFrame, GradientBackground, Subheadline } from "@/components/aso";
import { ExampleLayout } from "../components/Layout";
import { HabitMockup } from "../components/HabitMockup";
import { useT } from "../i18n";

const ACCENT = "#b45309";

export default function Tilted({ lang }: { lang?: string }) {
  const t = useT(lang);
  return (
    <ExampleLayout
      textColor="#78350f"
      background={<GradientBackground from="#fef3c7" via="#fde68a" to="#f59e0b" direction="to-br" />}
      headline={
        <h1 className="text-[9.5rem] font-extrabold leading-[0.92] tracking-[-0.03em]">
          {t.tilted.headline(ACCENT)}
        </h1>
      }
      subheadline={
        <Subheadline size="lg" color="#92400e">
          {t.tilted.sub}
        </Subheadline>
      }
      mockup={
        <div className="h-full" style={{ perspective: "1800px" }}>
          <div
            className="h-full"
            style={{
              transform: "rotateY(-22deg) rotateX(6deg) rotateZ(-3deg)",
              filter: "drop-shadow(30px 50px 60px rgba(120, 53, 15, 0.45))",
            }}
          >
            <DeviceFrame className="h-full w-auto">
              <HabitMockup t={t.mock} accent="#d97706" />
            </DeviceFrame>
          </div>
        </div>
      }
    />
  );
}
