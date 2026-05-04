import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";

import { KeyPointCard } from "@/components/cards/KeyPointCard";
import { MiniQuizCard } from "@/components/cards/MiniQuizCard";
import { ReferencedSectionCard } from "@/components/cards/ReferencedSectionCard";
import { SafetyNoteCard } from "@/components/cards/SafetyNoteCard";
import { SourceCard } from "@/components/cards/SourceCard";
import { TeacherNoteCard } from "@/components/cards/TeacherNoteCard";
import { SourceBadge } from "@/components/content/SourceBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { getSourcesByIds } from "@/lib/content-utils";
import { contentRepository } from "@/lib/repositories";

interface LessonDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const lessons = await contentRepository.getLessons();

  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await contentRepository.getLessonBySlug(slug);

  if (!lesson) return {};

  return {
    title: lesson.title,
    description: lesson.summary,
  };
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

  const lessonSources = getSourcesByIds(lesson.sourceIds, sources);
  const relatedPoses = poses.filter((pose) => lesson.relatedPoseSlugs.includes(pose.slug));
  const relatedAnatomy = anatomyItems.filter((item) =>
    lesson.relatedAnatomySlugs.includes(item.slug)
  );

  return (
    <div className="space-y-8 py-6">
      <Link href="/lessons">
        <Button variant="ghost" className="rounded-full px-2 text-muted-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" />
          レッスン一覧へ
        </Button>
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-sage-200 bg-sage-50 text-sage-900"
            >
              {lesson.category}
            </Badge>
            <Badge variant="outline" className="rounded-full bg-white/70">
              {lesson.level}
            </Badge>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs text-muted-foreground">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {lesson.estimatedMinutes}分
            </span>
            <SourceBadge count={lesson.sourceIds.length} />
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-xl text-charcoal-700">{lesson.subtitle}</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            {lesson.summary}
          </p>
        </div>
        <KeyPointCard points={lesson.learningObjectives} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[250px_minmax(0,1fr)_330px]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <Card className="bg-white/70">
            <CardHeader>
              <CardTitle>Lesson outline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {lesson.sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-start gap-3 rounded-2xl p-2 transition hover:bg-muted"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-50 text-xs text-sage-900">
                    {index + 1}
                  </span>
                  <span>{section.title}</span>
                </a>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-white/70">
            <CardContent className="p-4 text-sm leading-7 text-muted-foreground">
              進捗はMVPでは保存しません。将来、Neonへ移行するときにユーザー別進捗を追加できる構造です。
            </CardContent>
          </Card>
        </aside>

        <article className="space-y-6">
          <BodyMapIllustration
            highlights={[lesson.bodyArea, ...lesson.tags]}
            className="min-h-[360px]"
          />
          {lesson.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <ReferencedSectionCard section={section} />
            </section>
          ))}

          <Card className="bg-white/75">
            <CardHeader>
              <CardTitle>Common observations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
                {lesson.commonObservations.map((observation) => (
                  <li key={observation} className="rounded-2xl bg-muted/60 p-4">
                    {observation}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <MiniQuizCard quizzes={lesson.quiz} />
        </article>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <TeacherNoteCard notes={lesson.teacherNotes} />
          <SafetyNoteCard notes={lesson.safetyNotes} />

          <Card className="bg-white/70">
            <CardHeader>
              <CardTitle>関連ポーズ</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {relatedPoses.map((pose) => (
                <Link
                  key={pose.id}
                  href={`/poses/${pose.slug}`}
                  className="rounded-2xl bg-muted/60 p-3 text-sm transition hover:bg-sage-50"
                >
                  {pose.nameJa}
                  <span className="block text-xs text-muted-foreground">{pose.nameEn}</span>
                </Link>
              ))}
              <Separator />
              {relatedAnatomy.map((item) => (
                <Link
                  key={item.id}
                  href={`/anatomy/${item.slug}`}
                  className="rounded-2xl bg-white/60 p-3 text-sm transition hover:bg-sage-50"
                >
                  {item.nameJa}
                  <span className="block text-xs text-muted-foreground">{item.nameEn}</span>
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
