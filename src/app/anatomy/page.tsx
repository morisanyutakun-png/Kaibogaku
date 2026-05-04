import type { Metadata } from "next";

import { AnatomyExplorer } from "@/components/filters/AnatomyExplorer";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "解剖図鑑｜カード一覧",
  description: "筋肉・関節・骨・概念を、ヨガ講師の観察と安全配慮につなげて学ぶ解剖カード一覧。",
};

export default async function AnatomyPage() {
  const items = await contentRepository.getAnatomyItems();
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-9 pb-20 pt-2">
      <header className="space-y-1.5 pt-1">
        <div className="kicker">Anatomy Library</div>
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">
          解剖図鑑
        </h1>
        <p className="max-w-[58ch] text-[13.5px] leading-relaxed text-muted-foreground text-pretty">
          筋肉・関節・骨・概念を、基礎解剖学とヨガ指導上の意味に分けて読みます。各カードは参照元に紐づきます。
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-stretch">
        <div className="surface-card flex flex-col justify-between p-6">
          <div>
            <div className="kicker">Today’s map</div>
            <h2 className="mt-2 text-[20px] font-semibold leading-tight tracking-tight">
              身体の地図と一緒に散策する
            </h2>
            <p className="mt-2 max-w-[44ch] text-[13px] leading-relaxed text-muted-foreground">
              気になる部位をタップして、関連するレッスン・ポーズへ移動できます。
            </p>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {(["muscle", "joint", "bone", "concept"] as const).map((type) => (
              <div key={type} className="rounded-2xl bg-muted/60 p-3 text-center">
                <div className="num text-[18px] font-semibold leading-none tracking-tight">
                  {counts[type] ?? 0}
                </div>
                <div className="mt-1 text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                  {type === "muscle" ? "筋" : type === "joint" ? "関節" : type === "bone" ? "骨" : "概念"}
                </div>
              </div>
            ))}
          </div>
        </div>
        <BodyMapIllustration highlights={["肩", "胸郭", "脊柱", "股関節", "ハム"]} />
      </section>

      <AnatomyExplorer items={items} />
    </div>
  );
}
