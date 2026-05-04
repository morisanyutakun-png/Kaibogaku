import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { listAllPracticeQuestions } from "@/lib/quiz-bank";
import { dailySeed, getJstNow, seededShuffle } from "@/lib/utils";

export const metadata: Metadata = {
  title: "復習セッション 10問｜演習",
};

export const dynamic = "force-dynamic";

export default function PracticeExamPage() {
  const all = listAllPracticeQuestions();
  if (all.length === 0) notFound();

  const seed = dailySeed(getJstNow());
  const shuffled = seededShuffle(all, seed).slice(0, Math.min(10, all.length));

  return (
    <div className="pt-2">
      <QuizPlayer
        questions={shuffled}
        title="今日の10問"
        kicker="ふりかえり"
        exitHref="/practice"
      />
    </div>
  );
}
