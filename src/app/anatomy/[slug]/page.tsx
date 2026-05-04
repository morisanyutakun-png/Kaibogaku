import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Layers3, Move3D, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SafetyNoteCard } from "@/components/cards/SafetyNoteCard";
import { SourceCard } from "@/components/cards/SourceCard";
import { TeacherNoteCard } from "@/components/cards/TeacherNoteCard";
import { SourceBadge } from "@/components/content/SourceBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { getSourcesByIds } from "@/lib/content-utils";
import { contentRepository } from "@/lib/repositories";

interface AnatomyDetailPageProps {
  params: Promise<{ slug: string }>;
}

const typeLabel = {
  muscle: "筋肉",
  joint: "関節",
  bone: "骨",
  concept: "概念",
};

function DetailListCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: LucideIcon;
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
  const items = await contentRepository.getAnatomyItems();

  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: AnatomyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await contentRepository.getAnatomyItemBySlug(slug);

  if (!item) return {};

  return {
    title: `${item.nameJa} / ${item.nameEn}`,
    description: item.summary,
  };
}

export default async function AnatomyDetailPage({ params }: AnatomyDetailPageProps) {
  const { slug } = await params;
  const [item, poses, lessons, sources] = await Promise.all([
    contentRepository.getAnatomyItemBySlug(slug),
    contentRepository.getPoses(),
    contentRepository.getLessons(),
    contentRepository.getSources(),
  ]);

  if (!item) notFound();

  const itemSources = getSourcesByIds(item.sourceIds, sources);
  const relatedPoses = poses.filter((pose) => item.relatedPoses.includes(pose.slug));
  const relatedLessons = lessons.filter((lesson) => item.relatedLessons.includes(lesson.slug));

  return (
    <div className="space-y-8 py-6">
      <Link href="/anatomy">
        <Button variant="ghost" className="rounded-full px-2 text-muted-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" />
          解剖カード一覧へ
        </Button>
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-sage-200 bg-sage-50 text-sage-900"
            >
              {typeLabel[item.type]}
            </Badge>
            <Badge variant="outline" className="rounded-full bg-white/70">
              {item.category}
            </Badge>
            <SourceBadge count={item.sourceIds.length} />
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {item.nameJa}
          </h1>
          <p className="mt-3 text-xl text-charcoal-700">{item.nameEn}</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{item.summary}</p>
        </div>
        <BodyMapIllustration highlights={[item.nameJa, item.category]} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <article className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <DetailListCard title="解剖学的説明" items={item.anatomyBasics} icon={Layers3} />
            <DetailListCard
              title="ヨガでの意味"
              items={item.meaningForYogaTeachers}
              icon={Move3D}
            />
          </div>
          <DetailListCard title="関連する動き" items={item.relatedMovements} icon={Move3D} />
          <DetailListCard
            title="講師が観察するポイント"
            items={item.observationPoints}
            icon={Eye}
          />
          <DetailListCard
            title="よくある代償動作"
            items={item.compensationPatterns}
            icon={ShieldCheck}
          />
        </article>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <TeacherNoteCard notes={item.meaningForYogaTeachers} />
          <SafetyNoteCard notes={item.safetyNotes} />

          <Card className="bg-white/70">
            <CardHeader>
              <CardTitle>関連ポーズ・レッスン</CardTitle>
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
              {relatedLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.slug}`}
                  className="rounded-2xl bg-white/60 p-3 text-sm transition hover:bg-sage-50"
                >
                  {lesson.title}
                  <span className="block text-xs text-muted-foreground">{lesson.category}</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <SourceCard sources={itemSources} />
        </aside>
      </div>
    </div>
  );
}
