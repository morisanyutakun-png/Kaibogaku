import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { getPracticeQuestionsForPose } from "@/lib/quiz-bank";
import { contentRepository } from "@/lib/repositories";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pose = await contentRepository.getPoseBySlug(slug);
  return {
    title: pose ? `${pose.nameJa} の一問一答｜演習` : "演習",
  };
}

export default async function PracticePosePage({ params }: PageProps) {
  const { slug } = await params;
  const pose = await contentRepository.getPoseBySlug(slug);
  if (!pose) notFound();
  const questions = getPracticeQuestionsForPose(slug);
  if (questions.length === 0) notFound();

  return (
    <div className="pt-2">
      <QuizPlayer
        questions={questions}
        title={pose.nameJa}
        kicker={`${pose.nameEn} · ポーズの一問一答`}
        exitHref={`/poses/${slug}`}
      />
    </div>
  );
}
