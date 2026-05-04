export const schemaPlan = {
  sources: ["id", "title", "organization", "url", "type", "description", "lastReviewedAt"],
  lessons: [
    "id",
    "slug",
    "title",
    "subtitle",
    "summary",
    "category",
    "level",
    "estimatedMinutes",
    "bodyArea",
  ],
  poses: ["id", "slug", "nameJa", "nameEn", "sanskritName", "difficulty", "cautionLevel"],
  anatomyItems: ["id", "slug", "type", "nameJa", "nameEn", "category"],
  safetyTopics: ["id", "slug", "title", "summary", "audience"],
  quizzes: ["id", "ownerType", "ownerId", "question", "choices", "answerIndex", "explanation"],
  joins: [
    "lessonSources",
    "poseSources",
    "anatomySources",
    "quizSources",
    "lessonPoses",
    "lessonAnatomy",
    "poseAnatomy",
  ],
} as const;

// TODO: Replace this planning object with Drizzle table definitions during the
// Neon migration. Keep source joins required in editorial workflows so claims
// without a sourceId cannot be published accidentally.
