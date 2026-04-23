"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ExportProgress } from "@/lib/export";
import { FORMATS } from "@/lib/formats";

type Props = {
  project: string;
  screenshots: string[];
  languages?: string[];
  isProtected?: boolean;
};

type RunState = {
  running: boolean;
  current: number;
  total: number;
  label: string;
};

const INITIAL: RunState = {
  running: false,
  current: 0,
  total: 0,
  label: "",
};

const REQUIRED_FORMAT_IDS = FORMATS.filter((f) => f.required).map((f) => f.id);
const ALL_FORMAT_IDS = FORMATS.map((f) => f.id);

export function ExportButton({
  project,
  screenshots,
  languages,
  isProtected = false,
}: Props) {
  const [state, setState] = useState<RunState>(INITIAL);
  const [open, setOpen] = useState(false);
  const [selectedScreens, setSelectedScreens] = useState<string[]>(screenshots);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(
    REQUIRED_FORMAT_IDS,
  );
  const [selectedLangs, setSelectedLangs] = useState<string[]>(
    languages ?? [],
  );

  const handleEvent = (event: ExportProgress) => {
    if (event.type === "start") {
      setState((s) => ({
        running: true,
        current: 0,
        total: s.total + event.total,
        label: `0 / ${event.total}`,
      }));
    } else if (event.type === "screenshot") {
      setState((s) => ({
        ...s,
        running: true,
        current: s.current + 1,
        label: `${event.screenshot} → ${event.format}`,
      }));
    } else if (event.type === "error") {
      toast.error(
        event.screenshot
          ? `Erreur sur ${event.screenshot}/${event.format}: ${event.error}`
          : `Erreur: ${event.error}`,
      );
    } else if (event.type === "done") {
      toast.success(
        `${event.count} screenshots exportés dans ${event.outputDir}`,
      );
    }
  };

  const startExport = async () => {
    const total =
      selectedScreens.length *
      selectedFormats.length *
      Math.max(1, selectedLangs.length || 1);
    if (total === 0) {
      toast.error("Aucun élément sélectionné");
      return;
    }
    let devCode: string | undefined;
    if (isProtected) {
      const code = typeof window !== "undefined"
        ? window.prompt(
            `"${project}" is protected.\nEnter developer code to export:`,
          )
        : null;
      if (!code) {
        toast.error("Developer code required for this protected project");
        return;
      }
      devCode = code;
    }

    setOpen(false);
    setState({ ...INITIAL, running: true, label: "Démarrage…", total: 0 });

    try {
      const body: Record<string, unknown> = {
        project,
        screenshotIds: selectedScreens,
        formatIds: selectedFormats,
      };
      if (selectedLangs.length > 0) body.langs = selectedLangs;
      if (devCode) body.devCode = devCode;

      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 403) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message ?? "Access denied");
        return;
      }
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          try {
            handleEvent(JSON.parse(part.slice(6)) as ExportProgress);
          } catch {
            // ignore malformed chunk
          }
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Export failed");
    } finally {
      setState((s) => ({ ...s, running: false }));
    }
  };

  const toggle = (list: string[], item: string) =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  const pct = state.total > 0 ? (state.current / state.total) * 100 : 0;
  const nbToExport =
    selectedScreens.length *
    selectedFormats.length *
    Math.max(1, selectedLangs.length || 1);

  return (
    <div className="flex flex-col items-end gap-2 min-w-[260px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={state.running}
          className={buttonVariants({ variant: "default" })}
        >
          {state.running ? "Export en cours…" : "Export"}
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[360px] max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <Section
              title="Screenshots"
              items={screenshots}
              selected={selectedScreens}
              onToggle={(i) => setSelectedScreens((s) => toggle(s, i))}
              onAll={() => setSelectedScreens(screenshots)}
              onNone={() => setSelectedScreens([])}
            />

            <Section
              title="Formats"
              items={ALL_FORMAT_IDS}
              labels={Object.fromEntries(
                FORMATS.map((f) => [f.id, `${f.label} (${f.width}×${f.height})`]),
              )}
              selected={selectedFormats}
              onToggle={(i) => setSelectedFormats((s) => toggle(s, i))}
              onAll={() => setSelectedFormats(ALL_FORMAT_IDS)}
              onNone={() => setSelectedFormats([])}
              onRequired={() => setSelectedFormats(REQUIRED_FORMAT_IDS)}
            />

            {languages && languages.length > 0 ? (
              <Section
                title="Langues"
                items={languages}
                selected={selectedLangs}
                onToggle={(i) => setSelectedLangs((s) => toggle(s, i))}
                onAll={() => setSelectedLangs(languages)}
                onNone={() => setSelectedLangs([])}
              />
            ) : null}

            <Button className="w-full" onClick={startExport}>
              Exporter {nbToExport} PNG
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {state.running ? (
        <>
          <Progress value={pct} className="w-full" />
          <p className="text-xs text-muted-foreground truncate w-full text-right">
            {state.current}/{state.total} — {state.label}
          </p>
        </>
      ) : null}
    </div>
  );
}

function Section({
  title,
  items,
  labels,
  selected,
  onToggle,
  onAll,
  onNone,
  onRequired,
}: {
  title: string;
  items: string[];
  labels?: Record<string, string>;
  selected: string[];
  onToggle: (item: string) => void;
  onAll: () => void;
  onNone: () => void;
  onRequired?: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">
          {title} ({selected.length}/{items.length})
        </h3>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            onClick={onAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Tout
          </button>
          <span className="text-muted-foreground">·</span>
          {onRequired ? (
            <>
              <button
                type="button"
                onClick={onRequired}
                className="text-muted-foreground hover:text-foreground"
              >
                Requis
              </button>
              <span className="text-muted-foreground">·</span>
            </>
          ) : null}
          <button
            type="button"
            onClick={onNone}
            className="text-muted-foreground hover:text-foreground"
          >
            Aucun
          </button>
        </div>
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const id = `${title}-${item}`;
          return (
            <label
              key={item}
              htmlFor={id}
              className="flex items-center gap-2 text-sm cursor-pointer py-0.5"
            >
              <Checkbox
                id={id}
                checked={selected.includes(item)}
                onCheckedChange={() => onToggle(item)}
              />
              <span className="font-mono text-xs">
                {labels?.[item] ?? item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
