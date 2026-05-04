import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  HeartPulse,
  LibraryBig,
  Move3D,
  PersonStanding,
  ShieldCheck,
} from "lucide-react";

import { HeroSection } from "@/components/content/HeroSection";
import { LearningPathCard } from "@/components/cards/LearningPathCard";
import { LessonCard } from "@/components/cards/LessonCard";
import { SourceCard } from "@/components/cards/SourceCard";
import { KeyPointCard } from "@/components/cards/KeyPointCard";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Asana Anatomy Lab｜ヨガ講師のための解剖学学習プラットフォーム",
  description:
    "ポーズ・筋肉・関節・安全配慮を、信頼できる参照元をもとに学ぶヨガ講師向け解剖学プラットフォーム。",
};

export default async function Home() {
  const [lessons, poses, anatomyItems, sources] = await Promise.all([
    contentRepository.getLessons(),
    contentRepository.getPoses(),
    contentRepository.getAnatomyItems(),
    contentRepository.getSources(),
  ]);
  const todayLesson = lessons[4] ?? lessons[0];

  return (
    <div className="space-y-12">
      <HeroSection />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="bg-white/75">
          <CardHeader>
            <CardTitle>今日の学習カード</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <p className="text-sm text-muted-foreground">{todayLesson.category}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
                {todayLesson.title}
              </h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">{todayLesson.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {todayLesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/70 bg-white/70 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/lessons/${todayLesson.slug}`}>
                <Button className="mt-7 rounded-full bg-charcoal-900 text-white hover:bg-charcoal-800">
                  {todayLesson.estimatedMinutes}分で学ぶ
                </Button>
              </Link>
            </div>
            <BodyMapIllustration highlights={["肩", "胸郭", "脊柱"]} className="min-h-[320px]" />
          </CardContent>
        </Card>

        <KeyPointCard
          points={[
            `${lessons.length}本の基礎レッスンから学ぶ`,
            `${poses.length}ポーズを関節・筋肉・安全配慮で整理`,
            `${anatomyItems.length}枚の解剖カードをsourceIds付きで管理`,
          ]}
        />
      </section>

      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-sage-800">Learning paths</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.02em]">学びたい入口から入る</h2>
          </div>
          <Link href="/lessons">
            <Button variant="outline" className="rounded-full bg-white/70">
              すべてのレッスン
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <LearningPathCard
            title="基礎モジュール"
            description="解剖学用語、関節、筋肉、呼吸を、ヨガ講師の観察に使える形で整理します。"
            href="/lessons"
            icon={BookOpen}
            eyebrow="Foundations"
          />
          <LearningPathCard
            title="関節別に学ぶ"
            description="肩、股関節、脊柱など、ポーズ中に負担が集まりやすい部位を分けて見ます。"
            href="/anatomy"
            icon={Move3D}
            tone="sand"
            eyebrow="Joints"
          />
          <LearningPathCard
            title="ポーズ別に学ぶ"
            description="ダウンドッグ、戦士II、前屈などを、関節運動と修正候補から理解します。"
            href="/poses"
            icon={PersonStanding}
            tone="sage"
            eyebrow="Asana"
          />
          <LearningPathCard
            title="安全配慮"
            description="腰、手首、膝、妊娠中、高齢者などへの一般的な観察と配慮を確認します。"
            href="/safety"
            icon={HeartPulse}
            tone="terracotta"
            eyebrow="Safety"
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-sage-800">Next lessons</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.02em]">静かに積み上げる基礎</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lessons.slice(0, 3).map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="bg-white/75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-sage-700" aria-hidden="true" />
              信頼できる参照元をもとに構成
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-8 text-muted-foreground">
            <p>
              すべての教材データはsourceIdsを持ち、出典がない項目は警告として表示されます。解剖学的説明とヨガ指導上の解釈を分け、医療診断のような断定を避けます。
            </p>
            <Link href="/anatomy">
              <Button variant="outline" className="rounded-full bg-white/70">
                <LibraryBig className="size-4" aria-hidden="true" />
                解剖カードを見る
              </Button>
            </Link>
          </CardContent>
        </Card>
        <SourceCard sources={sources} />
      </section>
    </div>
  );
}
