import { createHash } from "node:crypto";
import { z } from "zod";
import { exportProject, type ExportProgress } from "@/lib/export";
import { FORMATS } from "@/lib/formats";
import { getProject } from "@/lib/project-loader";

export const runtime = "nodejs";
export const maxDuration = 300;

// sha256("rdh36")
const DEV_CODE_HASH =
  "e715381335eef2038c2b011c6301829eb7e40f1185c9440fa2dcf548a6b3bc21";

const BodySchema = z.object({
  project: z.string().min(1),
  formatIds: z.array(z.string()).optional(),
  langs: z.array(z.string()).optional(),
  screenshotIds: z.array(z.string()).optional(),
  devCode: z.string().optional(),
});

export async function POST(req: Request) {
  const raw = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: parsed.error.format() }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { project, formatIds, langs, screenshotIds, devCode } = parsed.data;

  const proj = await getProject(project);
  if (!proj) {
    return new Response(
      JSON.stringify({ error: `Project "${project}" not found` }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }
  if (proj.config.protected) {
    const provided = devCode ?? process.env.SCREENSHOOT_DEV_CODE ?? "";
    const hash = createHash("sha256").update(provided).digest("hex");
    if (hash !== DEV_CODE_HASH) {
      return new Response(
        JSON.stringify({
          error: "PROTECTED_PROJECT",
          message: `"${proj.config.name}" is protected. A developer code is required to export it.`,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }
  }

  const formats = formatIds
    ? FORMATS.filter((f) => formatIds.includes(f.id))
    : FORMATS;
  const languages: (string | undefined)[] =
    langs && langs.length > 0 ? langs : [undefined];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: ExportProgress) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        for (const lang of languages) {
          await exportProject(project, {
            formats,
            lang,
            screenshotIds,
            onProgress: send,
          });
        }
      } catch (err) {
        send({
          type: "error",
          error: err instanceof Error ? err.message : String(err),
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
