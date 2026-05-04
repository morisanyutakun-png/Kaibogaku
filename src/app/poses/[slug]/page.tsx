import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Dumbbell, Eye, Move3D, RefreshCcw, ShieldCheck } from "lucide-react";

import { MiniQuizCard } from "@/components/cards/MiniQuizCard";
import { SafetyNoteCard } from "@/components/cards/SafetyNoteCard";
import { SourceCard } from "@/components/cards/SourceCard";
import { TeacherNoteCard } from "@/components/cards/TeacherNoteCard";
import { CautionBadge } from "@/components/content/CautionBadge";
import { SourceBadge } from "@/components/content/SourceBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { PoseVisualCard } from "@/components/visuals/PoseVisualCard";
import { getSourcesByIds } from "@/lib/content-utils";
import { contentRepository } from "@/lib/repositories";

interface PoseDetailPageProps {
  params: Promise<{ slug: string }>;
}

function DetailListCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: typeof Move3D;
}) {
  return (
    <Card className="bg-white/75">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4 text-sage-700" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 text-sm leading-7 text-muted-foreground">
          {items.map((item) => (
            <li key={item} className="rounded-2xl bg-muted/60 p-4">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export async function generateStaticParams() {
  const poses = await contentRepository.getPoses();

  return poses.map((pose) => ({ slug: pose.slug }));
}

export async function generateMetadata({ params }: PoseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pose = await contentRepository.getPoseBySlug(slug);

  if (!pose) return {};

  return {
    title: `${pose.nameJa} / ${pose.nameEn}`,
    description: pose.summary,
  };
}

export default async function PoseDetailPage({ params }: PoseDetailPageProps) {
  const { slug } = await params;
  const [pose, lessons, anatomyItems, sources] = await Promise.all([
    contentRepository.getPoseBySlug(slug),
    contentRepository.getLessons(),
    contentRepository.getAnatomyItems(),
    contentRepository.getSources(),
  ]);

  if (!pose) notFound();

  const poseSources = getSourcesByIds(pose.sourceIds, sources);
  const relatedLessons = lessons.filter((lesson) => pose.relatedLessonSlugs.includes(lesson.slug));
  const relatedAnatomy = anatomyItems.filter((item) =>
    pose.relatedAnatomySlugs.includes(item.slug)
  );

  return (
    <div className="space-y-8 py-6">
      <Link href="/poses">
        <Button variant="ghost" className="rounded-full px-2 text-muted-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" />
          ポーズ一覧へ
        </Button>
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full bg-white/70">
              {pose.difficulty}
            </Badge>
            <CautionBadge level={pose.cautionLevel} />
            <SourceBadge count={pose.sourceIds.length} />
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {pose.nameJa}
          </h1>
          <p className="mt-3 text-xl text-charcoal-700">
            {pose.nameEn}
            {pose.sanskritName ? ` / ${pose.sanskritName}` : ""}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{pose.summary}</p>
        </div>
        <Card className="bg-white/70">
          <CardHeader>
            <CardTitle>このページで学ぶこと</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 text-sm leading-7 text-muted-foreground">
              <li>主な関節運動と関わる筋肉</li>
              <li>伸びやすい部位と安定に使う部位</li>
              <li>講師が観察するポイントと修正候補</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <article className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <PoseVisualCard poseSlug={pose.slug} title={pose.nameJa} />
            <BodyMapIllustration highlights={pose.bodyAreas} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <DetailListCard title="主な関節運動" items={pose.movementPatterns} icon={Move3D} />
            <DetailListCard title="関わる筋肉" items={pose.mainMuscles} icon={Dumbbell} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <DetailListCard title="伸びやすい部位" items={pose.stretchAreas} icon={RefreshCcw} />
            <DetailListCard title="安定に使う部位" items={pose.stabilityAreas} icon={ShieldCheck} />
          </div>

          <DetailListCard
            title="講師が観察するポイント"
            items={pose.observationPoints}
            icon={Eye}
          />
          <DetailListCard
            title="負担が出やすいパターン"
            items={pose.commonLoadPatterns}
            icon={ShieldCheck}
          />
          <DetailListCard title="修正候補" items={pose.modificationIdeas} icon={RefreshCcw} />
          <MiniQuizCard quizzes={pose.quiz} />
        </article>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <TeacherNoteCard notes={pose.teachingFocus} />
          <SafetyNoteCard notes={pose.safetyNotes} />

          <Card className="bg-white/70">
            <CardHeader>
              <CardTitle>関連教材</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {relatedLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.slug}`}
                  className="rounded-2xl bg-muted/60 p-3 text-sm transition hover:bg-sage-50"
                >
                  {lesson.title}
                  <span className="block text-xs text-muted-foreground">{lesson.category}</span>
                </Link>
              ))}
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

          <SourceCard sources={poseSources} />
        </aside>
      </div>
    </div>
  );
}
