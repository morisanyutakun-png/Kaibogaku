import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { getPracticeQuestionsForLesson } from "@/lib/quiz-bank";
import { contentRepository } from "@/lib/repositories";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await contentRepository.getLessonBySlug(slug);
  return {
    title: lesson ? `${lesson.title} の一問一答｜演習` : "演習",
  };
}

export default async function PracticeLessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = await contentRepository.getLessonBySlug(slug);
  if (!lesson) notFound();
  const questions = getPracticeQuestionsForLesson(slug);
  if (questions.length === 0) notFound();

  return (
    <div className="pt-2">
      <QuizPlayer
        questions={questions}
        title={lesson.title}
        kicker={`${lesson.category} · 一問一答`}
        exitHref={`/lessons/${slug}`}
      />
    </div>
  );
}
