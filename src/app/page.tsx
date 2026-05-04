import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, BookOpenCheck, ListChecks, ShieldCheck } from "lucide-react";

import { QuickAnswerCard } from "@/components/cards/QuickAnswerCard";
import { SourceCard } from "@/components/cards/SourceCard";
import { StudyTocCard } from "@/components/cards/StudyTocCard";
import { TrustBadge } from "@/components/content/TrustBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Asana Anatomy Lab｜ヨガ講師のための解剖学学習ToC",
  description:
    "一問一答と学習目次に絞って、ポーズ・筋肉・関節・安全配慮を信頼できる参照元から学ぶヨガ講師向け解剖学プラットフォーム。",
};

export default async function Home() {
  const [tocEntries, sources] = await Promise.all([
    contentRepository.getStudyTocEntries(),
    contentRepository.getSources(),
  ]);
  const tocSourceIds = new Set(tocEntries.flatMap((entry) => entry.sourceIds));
  const tocSources = sources.filter((source) => tocSourceIds.has(source.id));
  const primaryQuestion = tocEntries[0];

  return (
    <div className="space-y-12 py-3 sm:py-7">
      <section className="grid gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
        <div className="max-w-3xl">
          <TrustBadge />
          <p className="mt-8 text-sm font-medium tracking-[0.2em] text-sage-800 uppercase">
            Yoga Anatomy Learning ToC
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-charcoal-900 sm:text-5xl lg:text-6xl">
            ヨガ解剖学を、
            <br />
            目次と一問一答で学ぶ。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Asana Anatomy
            Labは、講師養成で必要になる解剖学・ポーズ観察・安全配慮を、読む順番がわかるToCとして整理した学習プラットフォームです。
            まずは短い問いに答えながら、身体の仕組みからポーズを見ます。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#toc">
              <Button className="h-11 rounded-full bg-charcoal-900 px-5 text-white hover:bg-charcoal-800">
                ToCを見る
                <ArrowDown className="size-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/lessons">
              <Button variant="outline" className="h-11 rounded-full bg-white/70 px-5">
                レッスン一覧
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-3 text-sm leading-7 text-muted-foreground sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-white/55 p-4">
              <BookOpenCheck className="mb-3 size-5 text-sage-700" aria-hidden="true" />
              学ぶ順番だけを提示
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/55 p-4">
              <ListChecks className="mb-3 size-5 text-sage-700" aria-hidden="true" />
              各章に一問一答
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/55 p-4">
              <ShieldCheck className="mb-3 size-5 text-sage-700" aria-hidden="true" />
              参考情報を明示
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <BodyMapIllustration
            highlights={["肩", "胸郭", "股関節", "脊柱"]}
            className="min-h-[360px]"
          />
          <QuickAnswerCard
            question={primaryQuestion.question}
            answer={primaryQuestion.answer}
            sourceCount={new Set(primaryQuestion.sourceIds).size}
            label="今日の一問"
          />
        </div>
      </section>

      <section id="toc" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col justify-between gap-4 border-t border-border/70 pt-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-sage-800">Study ToC</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-charcoal-900 sm:text-4xl">
              まず読む8章
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              機能は増やさず、目次から読む、短い問いで確認する、参考情報を見る。この3つに絞っています。
            </p>
          </div>
          <div className="rounded-full border border-sage-200 bg-sage-50 px-4 py-2 text-sm text-sage-950">
            {tocEntries.length} chapters / one-question review
          </div>
        </div>

        <div className="grid gap-4">
          {tocEntries.map((entry) => (
            <StudyTocCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
        <Card className="bg-white/72">
          <CardHeader>
            <CardTitle>このMVPでやること</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm leading-7 text-muted-foreground">
            <p>
              ポーズ検索や解剖カードの詳細ページは残しつつ、トップはToCに集約しました。学習者は「次に何を読むか」と「一問で確認すること」だけに集中できます。
            </p>
            <p>
              医療診断のような断定は避け、解剖学的説明とヨガ指導上の解釈を分けて表示する方針を維持しています。
            </p>
          </CardContent>
        </Card>
        <SourceCard sources={tocSources} />
      </section>
    </div>
  );
}
