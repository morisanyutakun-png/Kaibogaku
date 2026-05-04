import type { Metadata } from "next";

import { KeyPointCard } from "@/components/cards/KeyPointCard";
import { AnatomyExplorer } from "@/components/filters/AnatomyExplorer";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "解剖カード一覧",
  description: "筋肉・関節・骨・概念を、ヨガ講師の観察と安全配慮につなげて学ぶ解剖カード一覧。",
};

export default async function AnatomyPage() {
  const items = await contentRepository.getAnatomyItems();

  return (
    <div className="space-y-8 py-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_360px_360px] lg:items-end">
        <div>
          <p className="text-sm font-medium text-sage-800">Anatomy Library</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            解剖カード一覧
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            筋肉・関節・骨・概念を、基礎解剖学とヨガ指導上の意味に分けて読みます。各カードは参照元に紐づきます。
          </p>
        </div>
        <KeyPointCard
          points={[
            "Muscles / Joints / Bones / Conceptsで切り替える",
            "ヨガでの意味と観察ポイントを確認する",
            "関連ポーズから実践へ戻る",
          ]}
        />
        <BodyMapIllustration highlights={["肩", "胸郭", "脊柱", "股関節"]} />
      </section>
      <AnatomyExplorer items={items} />
    </div>
  );
}
