import type { Metadata } from "next";

import { KeyPointCard } from "@/components/cards/KeyPointCard";
import { LessonExplorer } from "@/components/filters/LessonExplorer";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "レッスン一覧",
  description: "基礎解剖学、関節、筋肉、ポーズ、安全配慮を学ぶヨガ講師向けレッスン一覧。",
};

export default async function LessonsPage() {
  const lessons = await contentRepository.getLessons();

  return (
    <div className="space-y-8 py-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <p className="text-sm font-medium text-sage-800">Lessons</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            レッスン一覧
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            解剖学の基礎、関節と筋肉、ポーズへの応用、安全配慮を、出典に紐づく短い教材として整理しています。
          </p>
        </div>
        <KeyPointCard
          points={[
            "カテゴリで学習テーマを絞り込む",
            "estimatedMinutesで今日の学習量を決める",
            "source countで参照元の有無を確認する",
          ]}
        />
      </section>
      <LessonExplorer lessons={lessons} />
    </div>
  );
}
