// Lshoot's own hero — the app screen in the rounded phone, value prop in the ribbon
import { LshootLayout } from "../components/Layout";
import { StudioMockup } from "../components/StudioMockup";

export default function Jsx() {
  return (
    <LshootLayout
      headline={
        <>
          Screenshots,
          <br />
          written in JSX
        </>
      }
      screen={<StudioMockup />}
    />
  );
}
