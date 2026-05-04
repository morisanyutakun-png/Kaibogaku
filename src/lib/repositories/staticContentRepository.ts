import { anatomyItems } from "@/data/anatomy";
import { lessons } from "@/data/lessons";
import { poses } from "@/data/poses";
import { safetyTopics } from "@/data/safety";
import { sources } from "@/data/sources";
import type { AnatomyItem, Lesson, Pose, SafetyTopic, Source } from "@/types/content";
import type { ContentRepository } from "./contentRepository";

export class StaticContentRepository implements ContentRepository {
  async getLessons(): Promise<Lesson[]> {
    return lessons;
  }

  async getLessonBySlug(slug: string): Promise<Lesson | null> {
    return lessons.find((lesson) => lesson.slug === slug) ?? null;
  }

  async getPoses(): Promise<Pose[]> {
    return poses;
  }

  async getPoseBySlug(slug: string): Promise<Pose | null> {
    return poses.find((pose) => pose.slug === slug) ?? null;
  }

  async getAnatomyItems(): Promise<AnatomyItem[]> {
    return anatomyItems;
  }

  async getAnatomyItemBySlug(slug: string): Promise<AnatomyItem | null> {
    return anatomyItems.find((item) => item.slug === slug) ?? null;
  }

  async getSafetyTopics(): Promise<SafetyTopic[]> {
    return safetyTopics;
  }

  async getSources(): Promise<Source[]> {
    return sources;
  }
}

export const staticContentRepository = new StaticContentRepository();
