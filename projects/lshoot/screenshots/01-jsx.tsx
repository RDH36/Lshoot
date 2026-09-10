// Lshoot's own hero — the editor inside the rounded phone, value prop in the ribbon
import { LshootLayout } from "../components/Layout";
import { EditorMockup } from "../components/EditorMockup";

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
      screen={<EditorMockup />}
    />
  );
}
