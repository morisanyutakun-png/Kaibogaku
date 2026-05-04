import Link from "next/link";
import { ArrowRight, BookOpen, Clock, PlayCircle, Sparkles } from "lucide-react";

import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { PoseSilhouette, shapeForSlug } from "@/components/visuals/PoseSilhouette";
import type { StudyTocEntry } from "@/types/content";
import { cn, toneFor, type TodayMode } from "@/lib/utils";

/**
 * Home hero — the single biggest tile on the page. The contents change with
 * the time of day so the same screen reads as "morning brief" / "afternoon
 * focus" / "evening recap" without the learner having to switch tabs.
 *
 *   read   →  featured lesson with reading time
 *   solve  →  one-question card with a CTA into the practice player
 *   review →  recap of today's earlier work + a 5-question wind-down
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
  const ctaLabel =
    mode === "read" ? "この章を読む" : mode === "solve" ? "今すぐ1問" : "5問でしめる";
  const kicker =
    mode === "read"
      ? "今朝のおすすめ"
      : mode === "solve"
        ? "昼のひと問"
        : "夜の振り返り";
  const ctaHref =
    mode === "solve" ? "/practice/random" : mode === "review" ? "/practice/random" : featured.href;

  const figureSlug = featured.kind === "pose" ? featured.href.split("/").pop() ?? "default" : "mountain-pose";

  return (
    <header className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[12px] text-muted-foreground">{dateLabel}</div>
          <h1 className="mt-1 text-[24px] font-semibold leading-tight tracking-tight sm:text-[28px]">
            {greeting}。
          </h1>
        </div>
        <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-[11px] text-muted-foreground sm:inline-flex">
          <Sparkles className="h-3 w-3 text-sage-700" />
          身体の仕組みから観察を組み立てる
        </div>
      </div>

      <Link
        href={ctaHref}
        className={cn(
          "editorial-card group relative block overflow-hidden p-0",
          "transition-transform"
        )}
      >
        <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4 p-6 sm:p-7">
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
            <p className="max-w-[58ch] text-[14px] leading-[1.85] text-muted-foreground text-pretty">
              {featured.summary}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                目安{" "}
                <span className="num font-semibold text-foreground">
                  {featured.estimatedMinutes}
                </span>{" "}
                分
              </span>
              <span aria-hidden className="text-border">·</span>
              <span>章 {featured.order}</span>
              <span aria-hidden className="text-border">·</span>
              <span>{featured.sourceIds.length} 出典</span>
            </div>
            <div className="pt-1">
              <span className="pill-sage h-11 px-5 text-[14px]">
                <PlayCircle className="h-4 w-4" />
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
          {/* Decorative side panel */}
          <div className={cn("relative hidden overflow-hidden lg:block", tone.gradient)}>
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
              className="relative z-10 animate-breathe"
              ariaLabel={`${featured.title} を象徴するポーズ`}
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-card">
              <span className="glass-chip">
                <Sparkles className="h-3 w-3" />
                {tone.label}
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] opacity-85">
                Asana
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick body-map glance — only on the read mode for morning calm */}
      {mode === "read" && (
        <div className="hidden">
          <BodyMapIllustration highlights={["肩", "脊柱"]} />
        </div>
      )}
    </header>
  );
}
