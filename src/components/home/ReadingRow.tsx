import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

import { ChapterArt, chapterArtFor } from "@/components/visuals/ChapterArt";
import { imageFor } from "@/data/imagery";
import type { StudyTocEntry } from "@/types/content";

/**
 * Editorial card row — the single most important navigation moment on
 * the home page after the hero. Each card has just three things: a
 * gradient cover, a title, and one timing cue. No tags, no badges, no
 * source counts (those live on the lesson page itself).
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
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3 px-1">
        <div className="min-w-0">
          <h2 className="text-[18px] font-semibold tracking-tight sm:text-[20px]">
            {title}
          </h2>
          {sub && (
            <p className="mt-0.5 text-[12px] text-muted-foreground">{sub}</p>
          )}
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
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {entries.map((entry) => (
          <ReadingCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function ReadingCard({ entry }: { entry: StudyTocEntry }) {
  const art = chapterArtFor(entry.eyebrow);
  const slug = entry.href.split("/").pop() ?? "";
  const photo =
    entry.kind === "pose"
      ? imageFor(slug, "poses")
      : imageFor(slug, "chapters");
  return (
    <Link
      href={entry.href}
      className="surface-card group flex h-full flex-col overflow-hidden p-0"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <ChapterArt
          variant={art.variant}
          glyph={art.glyph}
          caption={entry.eyebrow}
          imageSrc={photo}
          imageAlt={entry.title}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="text-[15.5px] font-semibold leading-snug tracking-tight">
          {entry.title}
        </div>
        <div className="mt-auto flex items-center gap-1.5 pt-3 text-[11.5px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span className="num font-semibold text-foreground">
            {entry.estimatedMinutes}
          </span>
          分
          <span className="ml-auto inline-flex items-center text-muted-foreground/70">
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
