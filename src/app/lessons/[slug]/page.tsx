import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Clock3,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import { KeyPointCard } from "@/components/cards/KeyPointCard";
import { ReferencedSectionCard } from "@/components/cards/ReferencedSectionCard";
import { SafetyNoteCard } from "@/components/cards/SafetyNoteCard";
import { SourceCard } from "@/components/cards/SourceCard";
import { TeacherNoteCard } from "@/components/cards/TeacherNoteCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { PoseSilhouette, shapeForSlug } from "@/components/visuals/PoseSilhouette";
import { getSourcesByIds } from "@/lib/content-utils";
import { contentRepository } from "@/lib/repositories";
import { cn, toneFor } from "@/lib/utils";

interface LessonDetailPageProps {
  params: Promise<{ slug: string }>;
}

const SHAPE_BY_CATEGORY: Record<string, string> = {
  基礎解剖学: "mountain-pose",
  関節: "tree-pose",
  筋肉: "warrior-ii",
  ポーズ: "downward-facing-dog",
  安全配慮: "childs-pose",
};

export async function generateStaticParams() {
  const lessons = await contentRepository.getLessons();
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await contentRepository.getLessonBySlug(slug);
  if (!lesson) return {};
  return { title: lesson.title, description: lesson.summary };
}

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { slug } = await params;
  const [lesson, poses, anatomyItems, sources] = await Promise.all([
    contentRepository.getLessonBySlug(slug),
    contentRepository.getPoses(),
    contentRepository.getAnatomyItems(),
    contentRepository.getSources(),
  ]);

  if (!lesson) notFound();

  const tone = toneFor(lesson.category);
  const shape = SHAPE_BY_CATEGORY[lesson.category] ?? "default";
  const lessonSources = getSourcesByIds(lesson.sourceIds, sources);
  const relatedPoses = poses.filter((pose) => lesson.relatedPoseSlugs.includes(pose.slug));
  const relatedAnatomy = anatomyItems.filter((item) =>
    lesson.relatedAnatomySlugs.includes(item.slug)
  );

  return (
    <div className="space-y-8 pb-20 pt-2">
      <Link
        href="/lessons"
        className="inline-flex items-center gap-1 text-[12.5px] font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        学ぶ一覧へ
      </Link>

      {/* Hero */}
      <section className="editorial-card relative overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4 p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: tone.hue }}
              >
                {tone.label}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{ background: tone.hueDim, color: tone.hue }}
              >
                {lesson.category}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                {lesson.level}
              </span>
              <span className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground">
                <Clock3 className="size-3.5" />
                <span className="num font-semibold text-foreground">{lesson.estimatedMinutes}</span>
                分
              </span>
            </div>
            <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-balance sm:text-[32px]">
              {lesson.title}
            </h1>
            <p className="text-[15px] leading-relaxed text-charcoal-700">{lesson.subtitle}</p>
            <p className="max-w-[60ch] text-[13.5px] leading-[1.85] text-muted-foreground text-pretty">
              {lesson.summary}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link
                href={`#sections`}
                className="pill-sage h-10 px-4 text-[13px]"
              >
                <BookOpenCheck className="h-3.5 w-3.5" />
                読みはじめる
              </Link>
              {lesson.quiz.length > 0 && (
                <Link
                  href={`/practice/lesson/${lesson.slug}`}
                  className="pill-outline h-10 px-4 text-[13px]"
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  一問一答 {lesson.quiz.length}問
                </Link>
              )}
            </div>
          </div>
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
              shape={shapeForSlug(shape)}
              className="relative z-10 animate-breathe"
              ariaLabel={`${lesson.title} の象徴イラスト`}
            />
            <span className="glass-chip absolute left-3 top-3 z-20">
              <Sparkles className="h-3 w-3" />
              {tone.label}
            </span>
          </div>
        </div>
      </section>

      <KeyPointCard points={lesson.learningObjectives} />

      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_320px]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <Card className="bg-card/70">
            <CardHeader>
              <CardTitle>章のアウトライン</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {lesson.sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-start gap-3 rounded-2xl p-2 transition hover:bg-muted"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-50 text-xs text-sage-900">
                    {index + 1}
                  </span>
                  <span className="text-[13px]">{section.title}</span>
                </a>
              ))}
            </CardContent>
          </Card>
          {lesson.quiz.length > 0 && (
            <Link
              href={`/practice/lesson/${lesson.slug}`}
              className="surface-card group block p-4"
            >
              <div className="flex items-center gap-3">
                <span className="tile-icon-sm bg-grad-sage">
                  <PlayCircle className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold leading-tight">
                    一問一答で確認
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    全 {lesson.quiz.length} 問を順に
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          )}
        </aside>

        <article id="sections" className="space-y-6 scroll-mt-24">
          <BodyMapIllustration
            highlights={[lesson.bodyArea, ...lesson.tags]}
            className="min-h-[360px]"
          />
          {lesson.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <ReferencedSectionCard section={section} />
            </section>
          ))}

          <Card className="bg-card/75">
            <CardHeader>
              <CardTitle>クラスでよく見られる観察</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 text-[13.5px] leading-7 text-muted-foreground sm:grid-cols-2">
                {lesson.commonObservations.map((observation) => (
                  <li key={observation} className="rounded-2xl bg-muted/60 p-4">
                    {observation}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Quiz launcher CTA */}
          {lesson.quiz.length > 0 && (
            <Link
              href={`/practice/lesson/${lesson.slug}`}
              className="hero-tile bg-grad-forest block"
            >
              <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] opacity-85">
                    Practice
                  </div>
                  <h3 className="mt-1 text-[20px] font-semibold leading-tight tracking-tight">
                    読了したら、一問一答で確かめる
                  </h3>
                  <p className="mt-1 max-w-[44ch] text-[12.5px] leading-relaxed opacity-90">
                    {lesson.quiz.length} 問。各問は出典に紐づき、誤答時にはやさしい解説が出ます。
                  </p>
                </div>
                <span className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-card/15 px-4 text-[13.5px] font-semibold text-card ring-1 ring-card/30 backdrop-blur">
                  <PlayCircle className="h-4 w-4" />
                  はじめる
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}
        </article>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <TeacherNoteCard notes={lesson.teacherNotes} />
          <SafetyNoteCard notes={lesson.safetyNotes} />

          <Card className="bg-card/70">
            <CardHeader>
              <CardTitle>関連ポーズ</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {relatedPoses.map((pose) => (
                <Link
                  key={pose.id}
                  href={`/poses/${pose.slug}`}
                  className="rounded-2xl bg-muted/60 p-3 text-[13px] transition hover:bg-sage-50"
                >
                  {pose.nameJa}
                  <span className="block text-[11px] text-muted-foreground">{pose.nameEn}</span>
                </Link>
              ))}
              <Separator />
              {relatedAnatomy.map((item) => (
                <Link
                  key={item.id}
                  href={`/anatomy/${item.slug}`}
                  className="rounded-2xl bg-card/60 p-3 text-[13px] transition hover:bg-sage-50"
                >
                  {item.nameJa}
                  <span className="block text-[11px] text-muted-foreground">{item.nameEn}</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <SourceCard sources={lessonSources} />
        </aside>
      </div>
    </div>
  );
}
