import Link from "next/link";

export default function PreviewNotFound() {
  return (
    <div className="bg-white rounded-lg p-10 max-w-lg text-center">
      <h1 className="text-2xl font-semibold mb-2">Screenshot introuvable</h1>
      <p className="text-sm text-neutral-600 mb-6">
        Le projet ou le screenshot demandé n&apos;existe pas dans{" "}
        <code className="bg-neutral-100 px-1 py-0.5 rounded">projects/</code>.
      </p>
      <Link
        href="/"
        className="inline-block text-sm underline text-neutral-800"
      >
        ← Retour au dashboard
      </Link>
    </div>
  );
}
