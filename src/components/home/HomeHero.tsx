import Link from "next/link";
import { ArrowRight, BookOpen, Clock, PlayCircle } from "lucide-react";

import { ChapterArt, chapterArtFor } from "@/components/visuals/ChapterArt";
import { imageFor } from "@/data/imagery";
import type { StudyTocEntry } from "@/types/content";
import { cn, toneFor, type TodayMode } from "@/lib/utils";

/**
 * Home hero — one decision per glance. The hero card carries:
 *   greeting → context badge → title → 1-line summary → primary CTA.
 *
 * The visual is an editorial gradient with a serif kanji glyph. If the
 * user drops `/public/images/chapters/{slug}.webp`, that photo takes
 * over the right panel automatically.
 */
export function HomeHero({
  mode,
  greeting,
  dateLabel,
  featured,
}: {
  mode: TodayMode;
  greeting: string;
  dateLabel: string;
  featured: StudyTocEntry;
}) {
  const tone = toneFor(featured.eyebrow);
  const art = chapterArtFor(featured.eyebrow);
  const ctaLabel =
    mode === "read" ? "この章を読む" : mode === "solve" ? "今日の1問へ" : "5問でしめる";
  const kicker =
    mode === "read"
      ? "今朝のおすすめ"
      : mode === "solve"
        ? "昼のひと問"
        : "夜の振り返り";
  const ctaHref =
    mode === "solve" ? "/practice/random" : mode === "review" ? "/practice/random" : featured.href;
  const slug = featured.href.split("/").pop() ?? "";
  const heroImage =
    featured.kind === "pose"
      ? imageFor(slug, "poses")
      : imageFor(slug, "chapters");

  return (
    <header className="space-y-5">
      <div className="px-1">
        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {dateLabel}
        </div>
        <h1 className="mt-1.5 text-[26px] font-semibold leading-[1.15] tracking-tight sm:text-[30px]">
          {greeting}。
        </h1>
      </div>

      <Link
        href={ctaHref}
        className={cn(
          "editorial-card group relative block overflow-hidden p-0",
          "transition-transform"
        )}
      >
        <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
          {/* Mobile: art on top */}
          <div className="relative aspect-[16/10] w-full overflow-hidden lg:hidden">
            <ChapterArt
              variant={art.variant}
              glyph={art.glyph}
              caption={tone.label}
              imageSrc={heroImage}
              imageAlt={featured.title}
            />
          </div>

          <div className="space-y-3.5 p-6 sm:space-y-4 sm:p-7">
            <div className="flex items-center gap-2">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: tone.hue }}
              >
                {kicker}
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{ background: tone.hueDim, color: tone.hue }}
              >
                <BookOpen className="h-3 w-3" />
                {featured.eyebrow}
              </span>
            </div>
            <h2 className="text-[22px] font-semibold leading-snug tracking-tight text-balance sm:text-[26px]">
              {featured.title}
            </h2>
            <p className="line-clamp-3 max-w-[58ch] text-[14px] leading-[1.85] text-muted-foreground text-pretty">
              {featured.summary}
            </p>
            <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span className="num font-semibold text-foreground">
                  {featured.estimatedMinutes}
                </span>
                分で読める
              </span>
            </div>
            <div className="pt-1.5">
              <span className="pill-sage h-12 px-5 text-[14.5px]">
                <PlayCircle className="h-4 w-4" />
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Desktop: art on right */}
          <div className="relative hidden overflow-hidden lg:block">
            <ChapterArt
              variant={art.variant}
              glyph={art.glyph}
              caption={tone.label}
              imageSrc={heroImage}
              imageAlt={featured.title}
            />
          </div>
        </div>
      </Link>
    </header>
  );
}
