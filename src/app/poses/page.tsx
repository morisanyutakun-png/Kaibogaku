import type { Metadata } from "next";

import { KeyPointCard } from "@/components/cards/KeyPointCard";
import { PoseExplorer } from "@/components/filters/PoseExplorer";
import { PoseVisualCard } from "@/components/visuals/PoseVisualCard";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "ポーズ解剖一覧",
  description: "ヨガポーズを関節、筋肉、講師の観察、安全配慮から学ぶポーズ解剖一覧。",
};

export default async function PosesPage() {
  const poses = await contentRepository.getPoses();

  return (
    <div className="space-y-8 py-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_360px_360px] lg:items-end">
        <div>
          <p className="text-sm font-medium text-sage-800">Pose Anatomy</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            ポーズ別に学ぶ
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            ポーズを完成形ではなく、主な関節運動、関わる筋肉、負担が出やすいパターン、修正候補として読み解きます。
          </p>
        </div>
        <KeyPointCard
          points={[
            "検索でポーズ名・筋肉・関節を探す",
            "body areaとdifficultyで絞り込む",
            "caution badgeで配慮の強さを確認する",
          ]}
        />
        <PoseVisualCard title="Pose study" />
      </section>
      <PoseExplorer poses={poses} />
    </div>
  );
}
