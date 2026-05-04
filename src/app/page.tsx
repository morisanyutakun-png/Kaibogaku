import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { HomeHero } from "@/components/home/HomeHero";
import { ReadingRow } from "@/components/home/ReadingRow";
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
    "ポーズ・関節・筋肉・呼吸・安全配慮を、信頼できる出典をもとに、短い読みものと一問一答で学ぶ学習プラットフォーム。",
};

export default async function Home() {
  const tocEntries = await contentRepository.getStudyTocEntries();

  const jst = getJstNow();
  const hour = jst.getUTCHours();
  const mode = todayModeForHour(hour);
  const greeting = greetingForHour(hour);
  const dateLabel = formatJstDate(jst);
  const featured = tocEntries[0];
  const reading = tocEntries.slice(1, 4);
  const totalCount = tocEntries.length;

  return (
    <div className="space-y-10 pb-24 pt-1 sm:space-y-12">
      <HomeHero
        mode={mode}
        greeting={greeting}
        dateLabel={dateLabel}
        featured={featured}
      />

      <ReadingRow
        title="つづきから"
        sub="3〜7分で1本"
        entries={reading}
      />

      <Link
        href="/lessons"
        className="surface-card flex items-center gap-4 p-5 sm:p-6"
      >
        <div className="min-w-0 flex-1">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            All chapters
          </div>
          <div className="mt-1 text-[15.5px] font-semibold tracking-tight">
            すべての章を見る
          </div>
          <div className="mt-0.5 text-[12.5px] text-muted-foreground">
            <span className="num font-semibold text-foreground">
              {totalCount}
            </span>{" "}
            章 ・ 一問一答付き
          </div>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </Link>

      <p className="px-1 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        信頼できる参照元をもとに、診断ではなく観察の言葉として整理しています。
        <br className="hidden sm:inline" />
        痛みや不安があるときは、医師・理学療法士・資格を持つ専門家へご相談ください。
      </p>
    </div>
  );
}
