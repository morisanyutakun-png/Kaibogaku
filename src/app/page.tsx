import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Compass, Map as MapIcon, Sparkles } from "lucide-react";

import { HomeHero } from "@/components/home/HomeHero";
import { MissionTracker } from "@/components/home/MissionTracker";
import { MoodTiles } from "@/components/home/MoodTiles";
import { ReadingRow } from "@/components/home/ReadingRow";
import { StudyTocCard } from "@/components/cards/StudyTocCard";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { contentRepository } from "@/lib/repositories";
import {
  formatJstDate,
  getJstNow,
  greetingForHour,
  todayModeForHour,
} from "@/lib/utils";

export const metadata: Metadata = {
  title: "解剖学 Lab｜ヨガ講師のための学習プラットフォーム",
  description:
    "ポーズ・関節・筋肉・呼吸・安全配慮を、信頼できる出典を引用しながら、短い読みものと一問一答で学ぶ学習プラットフォーム。",
};

export default async function Home() {
  const [tocEntries, sources] = await Promise.all([
    contentRepository.getStudyTocEntries(),
    contentRepository.getSources(),
  ]);

  const jst = getJstNow();
  const hour = jst.getUTCHours();
  const mode = todayModeForHour(hour);
  const greeting = greetingForHour(hour);
  const dateLabel = formatJstDate(jst);
  const featured = tocEntries[0];
  const reading = tocEntries.slice(1, 4);
  const remainingToc = tocEntries.slice(4);
  const featuredSourceIds = new Set(featured.sourceIds);
  const sourceCount = sources.filter((s) => featuredSourceIds.has(s.id)).length;

  return (
    <div className="space-y-9 pb-20 pt-2">
      <HomeHero
        mode={mode}
        greeting={greeting}
        dateLabel={dateLabel}
        featured={featured}
      />

      <MissionTracker />

      <MoodTiles />

      <ReadingRow
        title="読みかけ・気になる章"
        sub="3〜7分で1本読み切れます"
        entries={reading}
        rightHref="/lessons"
        rightLabel="学習目次へ"
      />

      {/* Body map + featured stats */}
      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="surface-card flex flex-col justify-between p-6 sm:p-7">
          <div className="space-y-3">
            <div className="kicker">Body Map</div>
            <h3 className="text-[20px] font-semibold leading-tight tracking-tight sm:text-[22px]">
              身体は、章を超えてつながっている。
            </h3>
            <p className="max-w-[44ch] text-[13.5px] leading-relaxed text-muted-foreground">
              肩、胸郭、脊柱、骨盤、ハムストリングス。次の章を読むと、ここに新しい言葉と観察が灯ります。
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/anatomy"
              className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4 transition-transform hover:bg-muted/70 active:scale-[0.99]"
            >
              <Compass className="h-4 w-4 text-sage-700" strokeWidth={2.4} />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold leading-tight">
                  解剖図鑑をひらく
                </div>
                <div className="text-[11.5px] text-muted-foreground">
                  関節・筋・骨を散策モードで
                </div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/poses"
              className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4 transition-transform hover:bg-muted/70 active:scale-[0.99]"
            >
              <MapIcon className="h-4 w-4 text-clay-700" strokeWidth={2.4} />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold leading-tight">
                  ポーズで観察する
                </div>
                <div className="text-[11.5px] text-muted-foreground">
                  ダウンドッグから戦士のポーズまで
                </div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          </div>
        </div>
        <BodyMapIllustration
          highlights={["肩", "胸郭", "股関節", "脊柱", "ハム"]}
          caption="今日の地図 — 主要部位ぜんぶ点灯"
        />
      </section>

      {/* ToC — full table of contents (collapsed below the fold) */}
      <section id="toc" className="scroll-mt-24 space-y-4">
        <div className="flex flex-col justify-between gap-4 border-t border-border/60 pt-7 md:flex-row md:items-end">
          <div>
            <div className="kicker">Study Index</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-balance sm:text-[28px]">
              まず読む {tocEntries.length} 章
            </h2>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
              機能は増やさず、目次から読む、短い問いで確認する、出典を見る。この3つに絞っています。
            </p>
          </div>
          <div className="rounded-full border border-sage-200 bg-sage-50 px-4 py-2 text-[12px] text-sage-950">
            <span className="num font-semibold">{tocEntries.length}</span> chapters · 一問一答付き
          </div>
        </div>
        <div className="grid gap-4">
          {remainingToc.map((entry) => (
            <StudyTocCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      {/* Footer reassurance */}
      <Link href={`/lessons/${featured.href.split("/").pop()}`} className="surface-card flex items-center gap-4 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-grad-forest text-card shadow-[0_8px_22px_rgba(49,68,47,0.32)]">
          <Sparkles className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold tracking-tight">
            参考情報を確かめながら学ぶ
          </div>
          <div className="mt-0.5 text-[12px] text-muted-foreground">
            今日の章は <span className="num font-semibold">{sourceCount}</span> の出典に紐づいています
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </div>
  );
}
