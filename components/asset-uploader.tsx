"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  project: string;
};

export function AssetUploader({ project }: Props) {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadOne = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("project", project);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string };
      toast.error(`${file.name}: ${err.error ?? res.statusText}`);
      return false;
    }
    toast.success(`${file.name} uploadé`);
    return true;
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await uploadOne(file);
      }
      router.refresh();
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
      }}
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        dragging ? "border-foreground bg-muted" : "border-muted"
      }`}
    >
      <p className="text-sm text-muted-foreground mb-4">
        Glisse tes captures ici (PNG, JPG, WebP — max 10 MB)
      </p>
      <label className="inline-block">
        <input
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          disabled={uploading}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <span className="inline-block px-4 py-2 bg-foreground text-background rounded-md text-sm cursor-pointer hover:opacity-90">
          {uploading ? "Upload en cours…" : "Ou parcourir"}
        </span>
      </label>
    </div>
  );
}
