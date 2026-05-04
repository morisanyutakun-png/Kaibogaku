import type { AnatomyItem, Lesson, Pose, SafetyTopic, Source } from "@/types/content";

export interface ContentRepository {
  getLessons(): Promise<Lesson[]>;
  getLessonBySlug(slug: string): Promise<Lesson | null>;
  getPoses(): Promise<Pose[]>;
  getPoseBySlug(slug: string): Promise<Pose | null>;
  getAnatomyItems(): Promise<AnatomyItem[]>;
  getAnatomyItemBySlug(slug: string): Promise<AnatomyItem | null>;
  getSafetyTopics(): Promise<SafetyTopic[]>;
  getSources(): Promise<Source[]>;
}
