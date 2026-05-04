import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

export function getJstNow(now: Date = new Date()): Date {
  return new Date(now.getTime() + JST_OFFSET_MS);
}

export function greetingForHour(hour: number): string {
  if (hour < 5) return "夜更かしお疲れさま";
  if (hour < 11) return "おはようございます";
  if (hour < 17) return "こんにちは";
  if (hour < 21) return "こんばんは";
  return "夜の練習、お疲れさま";
}

export function formatJstDate(jst: Date): string {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${jst.getUTCFullYear()}年${jst.getUTCMonth() + 1}月${jst.getUTCDate()}日 (${days[jst.getUTCDay()]})`;
}

/**
 * Maps a lesson category to a gradient + accent hue. The hue is used for kicker
 * text and tile washes; the gradient lives on hero/album surfaces.
 */
export type CategoryTone = {
  gradient: string;
  hue: string;
  hueDim: string;
  label: string;
};

export const CATEGORY_TONES: Record<string, CategoryTone> = {
  基礎解剖学: {
    gradient: "bg-grad-forest",
    hue: "#465c42",
    hueDim: "rgba(70, 92, 66, 0.10)",
    label: "Foundation",
  },
  関節: {
    gradient: "bg-grad-sage",
    hue: "#566f51",
    hueDim: "rgba(86, 111, 81, 0.10)",
    label: "Joints",
  },
  筋肉: {
    gradient: "bg-grad-terracotta",
    hue: "#a65f46",
    hueDim: "rgba(166, 95, 70, 0.10)",
    label: "Muscles",
  },
  ポーズ: {
    gradient: "bg-grad-sunrise",
    hue: "#874b37",
    hueDim: "rgba(135, 75, 55, 0.10)",
    label: "Asana",
  },
  安全配慮: {
    gradient: "bg-grad-dusk",
    hue: "#6f3d2f",
    hueDim: "rgba(111, 61, 47, 0.10)",
    label: "Safety",
  },
};

const DEFAULT_TONE: CategoryTone = {
  gradient: "bg-grad-ink",
  hue: "#3f3a34",
  hueDim: "rgba(63, 58, 52, 0.10)",
  label: "Study",
};

export function toneFor(category?: string): CategoryTone {
  if (!category) return DEFAULT_TONE;
  return CATEGORY_TONES[category] ?? DEFAULT_TONE;
}

/**
 * Time-of-day mode used by the home hero. Mornings invite reading; afternoons,
 * a quick question; evenings, a reflective recap.
 */
export type TodayMode = "read" | "solve" | "review";

export function todayModeForHour(hour: number): TodayMode {
  if (hour < 11) return "read";
  if (hour < 17) return "solve";
  return "review";
}

/**
 * Stable, deterministic shuffle so that the SSR result and the first client
 * paint match. Uses a small linear congruential PRNG seeded by the JST date.
 */
export function dailySeed(jst: Date = getJstNow()): number {
  return jst.getUTCFullYear() * 10000 + (jst.getUTCMonth() + 1) * 100 + jst.getUTCDate();
}

export function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = items.slice();
  let state = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
