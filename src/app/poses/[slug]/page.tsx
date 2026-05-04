import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Eye,
  Move3D,
  PlayCircle,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

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
import { PoseSilhouette, shapeForSlug } from "@/components/visuals/PoseSilhouette";
import { PoseVisualCard } from "@/components/visuals/PoseVisualCard";
import { imageFor } from "@/data/imagery";
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

  const posePhoto = imageFor(pose.slug, "poses");
  const poseSources = getSourcesByIds(pose.sourceIds, sources);
  const relatedLessons = lessons.filter((lesson) => pose.relatedLessonSlugs.includes(lesson.slug));
  const relatedAnatomy = anatomyItems.filter((item) =>
    pose.relatedAnatomySlugs.includes(item.slug)
  );

  return (
    <div className="space-y-8 pb-20 pt-2">
      <Link
        href="/poses"
        className="inline-flex items-center gap-1 text-[12.5px] font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        ポーズ一覧へ
      </Link>

      <section className="editorial-card relative overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4 p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full bg-card/70">
                {pose.difficulty}
              </Badge>
              <CautionBadge level={pose.cautionLevel} />
              <SourceBadge count={pose.sourceIds.length} />
            </div>
            <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-balance sm:text-[32px]">
              {pose.nameJa}
            </h1>
            <p className="text-[14px] text-charcoal-700">
              {pose.nameEn}
              {pose.sanskritName ? ` · ${pose.sanskritName}` : ""}
            </p>
            <p className="max-w-[60ch] text-[13.5px] leading-[1.85] text-muted-foreground text-pretty">
              {pose.summary}
            </p>
            {pose.quiz.length > 0 && (
              <div className="pt-1">
                <Link
                  href={`/practice/pose/${pose.slug}`}
                  className="pill-terracotta h-10 px-4 text-[13px]"
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  一問一答 {pose.quiz.length}問
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
          <div className="bg-grad-terracotta relative hidden overflow-hidden lg:block">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
              }}
            />
            <PoseSilhouette
              shape={shapeForSlug(pose.slug)}
              className="relative z-10"
              ariaLabel={pose.nameJa}
              imageSrc={posePhoto}
            />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <article className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <PoseVisualCard poseSlug={pose.slug} title={pose.nameJa} imageSrc={posePhoto} />
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
