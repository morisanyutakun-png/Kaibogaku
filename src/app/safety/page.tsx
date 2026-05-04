import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, HeartPulse, ShieldCheck } from "lucide-react";

import { SafetyNoteCard } from "@/components/cards/SafetyNoteCard";
import { SourceCard } from "@/components/cards/SourceCard";
import { SourceBadge } from "@/components/content/SourceBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSourcesByIds } from "@/lib/content-utils";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "安全配慮モジュール",
  description:
    "腰、手首、肩、膝、高齢者、妊娠中、初心者、痛みがある場合への一般的な観察と修正候補。",
};

export default async function SafetyPage() {
  const [topics, sources] = await Promise.all([
    contentRepository.getSafetyTopics(),
    contentRepository.getSources(),
  ]);

  const safetySourceIds = Array.from(new Set(topics.flatMap((topic) => topic.sourceIds)));
  const safetySources = getSourcesByIds(safetySourceIds, sources);

  return (
    <div className="space-y-8 py-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <p className="text-sm font-medium text-sage-800">Safety</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            安全配慮モジュール
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            医療アドバイスではなく、ヨガ講師がクラスで配慮しやすい一般的な観察・修正候補・言葉がけとして整理しています。
          </p>
        </div>
        <SafetyNoteCard />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topics.map((topic) => (
          <Card key={topic.id} className="bg-white/75">
            <CardHeader>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-800">
                  <HeartPulse className="size-5" aria-hidden="true" />
                </span>
                <SourceBadge count={topic.sourceIds.length} />
              </div>
              <CardTitle>{topic.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm leading-7 text-muted-foreground">
              <p>{topic.summary}</p>
              <div>
                <Badge variant="outline" className="rounded-full bg-white/70">
                  対象
                </Badge>
                <p className="mt-2">{topic.audience}</p>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-2 font-medium text-charcoal-900">
                  <ShieldCheck className="size-4 text-sage-700" aria-hidden="true" />
                  観察
                </p>
                <ul className="grid gap-2">
                  {topic.observationPoints.map((point) => (
                    <li key={point} className="rounded-2xl bg-muted/60 p-3">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-2 font-medium text-charcoal-900">
                  <CheckCircle2 className="size-4 text-sage-700" aria-hidden="true" />
                  修正候補
                </p>
                <ul className="grid gap-2">
                  {topic.modificationIdeas.map((idea) => (
                    <li key={idea} className="rounded-2xl bg-sage-50/70 p-3 text-sage-950/85">
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-2 font-medium text-charcoal-900">
                  <AlertTriangle className="size-4 text-terracotta-800" aria-hidden="true" />
                  避ける表現
                </p>
                <ul className="grid gap-2">
                  {topic.avoidClaims.map((claim) => (
                    <li
                      key={claim}
                      className="rounded-2xl bg-terracotta-50 p-3 text-terracotta-950/85"
                    >
                      {claim}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="bg-white/75">
          <CardHeader>
            <CardTitle>講師が使いやすい言葉</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm leading-7 text-muted-foreground">
            {topics
              .flatMap((topic) => topic.languageForTeachers)
              .slice(0, 8)
              .map((phrase) => (
                <p key={phrase} className="rounded-2xl bg-muted/60 p-4">
                  {phrase}
                </p>
              ))}
          </CardContent>
        </Card>
        <SourceCard sources={safetySources} />
      </section>
    </div>
  );
}
