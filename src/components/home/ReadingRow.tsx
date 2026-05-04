import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

import { PoseSilhouette, shapeForSlug } from "@/components/visuals/PoseSilhouette";
import { cn, toneFor } from "@/lib/utils";
import type { StudyTocEntry } from "@/types/content";

/**
 * Editorial card grid — feels like a magazine "in this issue" row. Each card
 * pairs a colored gradient mat with a pose / abstract silhouette and a few
 * lines of editorial copy.
 */
export function ReadingRow({
  title,
  sub,
  entries,
  rightHref,
  rightLabel,
}: {
  title: string;
  sub?: string;
  entries: StudyTocEntry[];
  rightHref?: string;
  rightLabel?: string;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3 px-1">
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold tracking-tight sm:text-[19px]">{title}</h2>
          {sub && <p className="mt-0.5 text-[12px] text-muted-foreground">{sub}</p>}
        </div>
        {rightHref && rightLabel && (
          <Link
            href={rightHref}
            className="inline-flex shrink-0 items-center gap-0.5 text-[12px] font-medium text-muted-foreground hover:text-foreground"
          >
            {rightLabel}
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <ReadingCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function ReadingCard({ entry }: { entry: StudyTocEntry }) {
  const tone = toneFor(entry.eyebrow);
  const figureSlug =
    entry.kind === "pose"
      ? entry.href.split("/").pop() ?? "default"
      : pickFigureForLesson(entry.eyebrow);

  return (
    <Link
      href={entry.href}
      className="surface-card group flex h-full flex-col overflow-hidden p-0"
    >
      <div className={cn("relative aspect-[16/10] w-full overflow-hidden", tone.gradient)}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
          }}
        />
        <PoseSilhouette
          shape={shapeForSlug(figureSlug)}
          className="relative z-10"
          ariaLabel={`${entry.title} の象徴イラスト`}
        />
        <span
          className="glass-chip absolute left-3 top-3 z-20"
          style={{ background: "rgba(255,255,255,0.22)" }}
        >
          {entry.order} · {tone.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="text-[15.5px] font-semibold leading-snug tracking-tight">
          {entry.title}
        </div>
        <p className="line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground text-pretty">
          {entry.summary}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-[11.5px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            <span className="num font-semibold text-foreground">{entry.estimatedMinutes}</span>{" "}
            分で読める
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground/70">
            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function pickFigureForLesson(eyebrow: string): string {
  switch (eyebrow) {
    case "入口":
      return "mountain-pose";
    case "関節":
      return "tree-pose";
    case "筋肉":
      return "warrior-ii";
    case "呼吸":
      return "childs-pose";
    case "ポーズ応用":
      return "downward-facing-dog";
    case "安全配慮":
      return "bridge-pose";
    case "まとめ":
      return "seated-forward-fold";
    default:
      return "default";
  }
}
