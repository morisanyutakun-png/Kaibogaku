import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { listAllPracticeQuestions } from "@/lib/quiz-bank";
import { dailySeed, getJstNow, seededShuffle } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ポーズで集中｜演習",
};

export const dynamic = "force-dynamic";

export default function PracticeFocusPage() {
  const all = listAllPracticeQuestions();
  const poseQs = all.filter((q) => q.source === "pose");
  if (poseQs.length === 0) notFound();

  const seed = dailySeed(getJstNow()) ^ Math.floor(Date.now() / 120000);
  const shuffled = seededShuffle(poseQs, seed).slice(0, Math.min(5, poseQs.length));

  return (
    <div className="pt-2">
      <QuizPlayer
        questions={shuffled}
        title="ポーズで集中 5問"
        kicker="観察を整える"
        exitHref="/practice"
      />
    </div>
  );
}
