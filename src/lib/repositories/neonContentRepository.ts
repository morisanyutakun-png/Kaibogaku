import type { AnatomyItem, Lesson, Pose, SafetyTopic, Source } from "@/types/content";
import type { ContentRepository } from "./contentRepository";

export class NeonContentRepository implements ContentRepository {
  // TODO: When moving to Neon PostgreSQL + Drizzle ORM:
  // 1. Install drizzle-orm, drizzle-kit, and @neondatabase/serverless.
  // 2. Define normalized tables in src/db/schema.ts for sources, lessons, poses,
  //    anatomy_items, quizzes, and join tables for source references.
  // 3. Lazily initialize the Neon/Drizzle client inside a getDb() helper so
  //    next build does not require DATABASE_URL at module evaluation time.
  // 4. Keep this repository interface stable so UI routes do not import DB
  //    details directly.
  // 5. Preserve sourceIds as required fields and surface missing-source content
  //    as an editorial warning rather than silently publishing it.

  async getLessons(): Promise<Lesson[]> {
    throw new Error("NeonContentRepository is not implemented yet.");
  }

  async getLessonBySlug(slug: string): Promise<Lesson | null> {
    void slug;
    throw new Error("NeonContentRepository is not implemented yet.");
  }

  async getPoses(): Promise<Pose[]> {
    throw new Error("NeonContentRepository is not implemented yet.");
  }

  async getPoseBySlug(slug: string): Promise<Pose | null> {
    void slug;
    throw new Error("NeonContentRepository is not implemented yet.");
  }

  async getAnatomyItems(): Promise<AnatomyItem[]> {
    throw new Error("NeonContentRepository is not implemented yet.");
  }

  async getAnatomyItemBySlug(slug: string): Promise<AnatomyItem | null> {
    void slug;
    throw new Error("NeonContentRepository is not implemented yet.");
  }

  async getSafetyTopics(): Promise<SafetyTopic[]> {
    throw new Error("NeonContentRepository is not implemented yet.");
  }

  async getSources(): Promise<Source[]> {
    throw new Error("NeonContentRepository is not implemented yet.");
  }
}
