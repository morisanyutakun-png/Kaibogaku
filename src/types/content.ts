export type SourceType = "official" | "textbook" | "research" | "guideline";

export interface Source {
  id: string;
  title: string;
  organization: string;
  url: string;
  type: SourceType;
  description: string;
  lastReviewedAt: string;
}

export type LessonCategory = "基礎解剖学" | "関節" | "筋肉" | "ポーズ" | "安全配慮";

export type ContentLevel = "入門" | "基礎" | "実践";

export interface Quiz {
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  sourceIds: string[];
}

export interface ContentSection {
  id: string;
  title: string;
  kind: "anatomy" | "teaching" | "observation" | "safety";
  body: string[];
  gentleExplanation?: string;
  sourceIds: string[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: LessonCategory;
  level: ContentLevel;
  estimatedMinutes: number;
  bodyArea: string;
  tags: string[];
  learningObjectives: string[];
  keyPoints: string[];
  sections: ContentSection[];
  teacherNotes: string[];
  commonObservations: string[];
  safetyNotes: string[];
  quiz: Quiz[];
  relatedPoseSlugs: string[];
  relatedAnatomySlugs: string[];
  sourceIds: string[];
}

export interface Pose {
  id: string;
  slug: string;
  nameJa: string;
  nameEn: string;
  sanskritName?: string;
  summary: string;
  difficulty: "やさしい" | "標準" | "注意深く";
  bodyAreas: string[];
  cautionLevel: "低" | "中" | "高";
  mainJoints: string[];
  mainMuscles: string[];
  movementPatterns: string[];
  teachingFocus: string[];
  stretchAreas: string[];
  stabilityAreas: string[];
  commonLoadPatterns: string[];
  observationPoints: string[];
  modificationIdeas: string[];
  safetyNotes: string[];
  relatedLessonSlugs: string[];
  relatedAnatomySlugs: string[];
  quiz: Quiz[];
  sourceIds: string[];
}

export type AnatomyType = "muscle" | "joint" | "bone" | "concept";

export interface AnatomyItem {
  id: string;
  slug: string;
  type: AnatomyType;
  nameJa: string;
  nameEn: string;
  category: string;
  summary: string;
  anatomyBasics: string[];
  meaningForYogaTeachers: string[];
  relatedMovements: string[];
  observationPoints: string[];
  compensationPatterns: string[];
  relatedPoses: string[];
  relatedLessons: string[];
  safetyNotes: string[];
  sourceIds: string[];
}

export interface SafetyTopic {
  id: string;
  slug: string;
  title: string;
  summary: string;
  audience: string;
  observationPoints: string[];
  modificationIdeas: string[];
  languageForTeachers: string[];
  avoidClaims: string[];
  sourceIds: string[];
}
