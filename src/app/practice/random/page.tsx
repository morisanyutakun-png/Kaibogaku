import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { listAllPracticeQuestions } from "@/lib/quiz-bank";
import { dailySeed, getJstNow, seededShuffle } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ランダム1問｜演習",
};

export const dynamic = "force-dynamic";

export default function PracticeRandomPage() {
  const all = listAllPracticeQuestions();
  if (all.length === 0) notFound();

  const seed = dailySeed(getJstNow()) ^ Math.floor(Date.now() / 60000);
  const shuffled = seededShuffle(all, seed).slice(0, 1);

  return (
    <div className="pt-2">
      <QuizPlayer
        questions={shuffled}
        title="ランダム1問"
        kicker="気分転換"
        exitHref="/practice"
      />
    </div>
  );
}
