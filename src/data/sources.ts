import type { Source } from "@/types/content";

export const sources: Source[] = [
  {
    id: "openstax-anatomy-terminology",
    title: "1.6 Anatomical Terminology",
    organization: "OpenStax / Rice University",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-6-anatomical-terminology",
    type: "textbook",
    description: "解剖学的肢位、方向用語、身体部位名を確認し、ポーズ観察の共通語を作るための章。",
    lastReviewedAt: "2026-05-04",
  },
  {
    id: "openstax-skeletal-muscle",
    title: "10.2 Skeletal Muscle",
    organization: "OpenStax / Rice University",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/10-2-skeletal-muscle",
    type: "textbook",
    description:
      "骨格筋を器官として捉え、結合組織、神経、血管、腱を介した運動との関係を確認する章。",
    lastReviewedAt: "2026-05-04",
  },
  {
    id: "yoga-alliance-rys-standards",
    title: "Standards for Registered Yoga School Credentials",
    organization: "Yoga Alliance",
    url: "https://yogaalliance.org/wp-content/uploads/2025/05/Standards-for-RYS-Credentials_NB22my-.pdf",
    type: "guideline",
    description:
      "ヨガ講師養成で扱う anatomy & physiology、安全な動き、身体的制限への配慮、実践への応用を確認するための基準。",
    lastReviewedAt: "2026-05-04",
  },
  {
    id: "openstax-anatomy-physiology-2e",
    title: "Anatomy and Physiology 2e",
    organization: "OpenStax / Rice University",
    url: "https://openstax.org/details/books/anatomy-and-physiology-2e",
    type: "textbook",
    description: "骨、関節、筋、胸郭、横隔膜などの基礎解剖学を確認するためのオープン教材。",
    lastReviewedAt: "2026-05-04",
  },
  {
    id: "nccih-yoga-effectiveness-safety",
    title: "Yoga: Effectiveness and Safety",
    organization: "NCCIH / NIH",
    url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
    type: "official",
    description:
      "ヨガの安全性、怪我の可能性、妊娠中・高齢者・健康状態に不安がある人への配慮を確認するための公的情報。",
    lastReviewedAt: "2026-05-04",
  },
  {
    id: "nccih-yoga-health-science",
    title: "Yoga for Health: What the Science Says",
    organization: "NCCIH / NIH",
    url: "https://www.nccih.nih.gov/health/providers/digest/yoga-for-health-science",
    type: "research",
    description: "ヨガの科学的情報、安全性、対象者ごとの注意点を医療従事者向けに整理した資料。",
    lastReviewedAt: "2026-05-04",
  },
];

export const safetyDisclaimer =
  "本プラットフォームは医療診断や治療を目的としたものではありません。痛みがある場合、既往歴がある場合、妊娠中、高齢者、不安がある場合は、医師・理学療法士・資格を持つ専門家に相談してください。";
