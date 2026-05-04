import { lessons } from "@/data/lessons";
import { poses } from "@/data/poses";
import type { Quiz } from "@/types/content";

/**
 * A normalized practice question. Wraps a raw `Quiz` from a lesson or pose
 * with provenance (where it came from) so the UI can deep-link the learner
 * back to the source.
 */
export type PracticeQuestion = {
  id: string;
  source: "lesson" | "pose";
  sourceSlug: string;
  sourceTitle: string;
  category: string;
  bodyArea?: string;
  estimatedSeconds: number;
  quiz: Quiz;
};

function cleanCategoryFromTags(tags: string[]): string {
  return tags[0] ?? "ヨガ解剖学";
}

export function listAllPracticeQuestions(): PracticeQuestion[] {
  const fromLessons: PracticeQuestion[] = lessons.flatMap((lesson) =>
    lesson.quiz.map((q, i) => ({
      id: `lesson:${lesson.slug}:${i}`,
      source: "lesson" as const,
      sourceSlug: lesson.slug,
      sourceTitle: lesson.title,
      category: lesson.category,
      bodyArea: lesson.bodyArea,
      estimatedSeconds: 45,
      quiz: q,
    }))
  );
  const fromPoses: PracticeQuestion[] = poses.flatMap((pose) =>
    pose.quiz.map((q, i) => ({
      id: `pose:${pose.slug}:${i}`,
      source: "pose" as const,
      sourceSlug: pose.slug,
      sourceTitle: pose.nameJa,
      category: cleanCategoryFromTags(pose.bodyAreas),
      bodyArea: pose.bodyAreas.join(" / "),
      estimatedSeconds: 45,
      quiz: q,
    }))
  );
  return [...fromLessons, ...fromPoses];
}

export function getPracticeQuestionsForLesson(slug: string): PracticeQuestion[] {
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) return [];
  return lesson.quiz.map((q, i) => ({
    id: `lesson:${slug}:${i}`,
    source: "lesson",
    sourceSlug: slug,
    sourceTitle: lesson.title,
    category: lesson.category,
    bodyArea: lesson.bodyArea,
    estimatedSeconds: 45,
    quiz: q,
  }));
}

export function getPracticeQuestionsForPose(slug: string): PracticeQuestion[] {
  const pose = poses.find((p) => p.slug === slug);
  if (!pose) return [];
  return pose.quiz.map((q, i) => ({
    id: `pose:${slug}:${i}`,
    source: "pose",
    sourceSlug: slug,
    sourceTitle: pose.nameJa,
    category: cleanCategoryFromTags(pose.bodyAreas),
    bodyArea: pose.bodyAreas.join(" / "),
    estimatedSeconds: 45,
    quiz: q,
  }));
}
