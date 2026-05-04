import Link from "next/link";
import { ArrowRight, BookOpen, HeartPulse, LibraryBig, PersonStanding } from "lucide-react";

import { QuickAnswerInline } from "@/components/cards/QuickAnswerInline";
import { SourceBadge } from "@/components/content/SourceBadge";
import { Badge } from "@/components/ui/badge";
import type { StudyTocEntry, StudyTocKind } from "@/types/content";

const kindLabel: Record<StudyTocKind, string> = {
  lesson: "Lesson",
  pose: "Pose",
  anatomy: "Anatomy",
  safety: "Safety",
};

const kindIcon: Record<StudyTocKind, typeof BookOpen> = {
  lesson: BookOpen,
  pose: PersonStanding,
  anatomy: LibraryBig,
  safety: HeartPulse,
};

export function StudyTocCard({ entry }: { entry: StudyTocEntry }) {
  const Icon = kindIcon[entry.kind];
  const sourceCount = new Set(entry.sourceIds).size;

  return (
    <article
      id={entry.id}
      className="grid gap-4 rounded-[1.35rem] border border-border/75 bg-white/72 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sage-200 hover:bg-white/86 hover:shadow-md md:grid-cols-[minmax(0,1fr)_320px] md:p-5"
    >
      <div className="flex gap-4">
        <div className="flex shrink-0 flex-col items-center">
          <span className="flex size-12 items-center justify-center rounded-2xl border border-sage-200 bg-sage-50 text-sm font-semibold text-sage-900">
            {entry.order}
          </span>
          <span className="mt-3 h-full w-px bg-border" aria-hidden="true" />
        </div>
        <div className="min-w-0 py-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-sand-200 bg-sand-50 text-sand-950"
            >
              <Icon className="size-3" aria-hidden="true" />
              {kindLabel[entry.kind]}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-border bg-white/70 text-muted-foreground"
            >
              {entry.eyebrow}
            </Badge>
            <SourceBadge count={sourceCount} />
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.025em] text-charcoal-900">
            {entry.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{entry.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={entry.href}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-charcoal-900 px-4 text-sm font-medium text-white transition hover:bg-charcoal-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sage-500/40"
            >
              {entry.estimatedMinutes}分で読む
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <span className="text-xs leading-6 text-muted-foreground">
              解剖学的説明と講師の解釈を分けて確認
            </span>
          </div>
        </div>
      </div>

      <QuickAnswerInline
        question={entry.question}
        answer={entry.answer}
        className="self-start md:mt-1"
      />
    </article>
  );
}
