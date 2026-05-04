/**
 * Imagery registry — maps a slug or category to a public image URL.
 *
 * The visual system (ChapterArt, PoseSilhouette) checks this map before
 * falling back to the gradient + serif glyph composition. To use real
 * photographs:
 *
 *   1. Generate or source a photo (the project is built around AI-
 *      generated yoga photography).
 *   2. Save it as `public/images/{folder}/{slug}.webp` (or .jpg).
 *   3. Add the entry below — or rely on the convention-based lookup
 *      `imageForSlug(slug, "poses")` which auto-resolves to
 *      `/images/poses/{slug}.webp`.
 *
 * Keep image dimensions ≥ 1280×800 for hero use and ≥ 800×600 for
 * cards. The component layer applies a warm-paper overlay so any
 * realistic photo lands consistently in the palette.
 */

const POSE_IMAGES: Record<string, string> = {
  // "downward-facing-dog": "/images/poses/downward-facing-dog.webp",
  // "warrior-ii":          "/images/poses/warrior-ii.webp",
};

const CHAPTER_IMAGES: Record<string, string> = {
  // "anatomy-for-yoga-teachers": "/images/chapters/anatomy-for-yoga-teachers.webp",
};

const ANATOMY_IMAGES: Record<string, string> = {
  // "shoulder-joint": "/images/anatomy/shoulder-joint.webp",
};

export type ImageFolder = "poses" | "chapters" | "anatomy";

export function imageFor(slug: string | undefined, folder: ImageFolder): string | undefined {
  if (!slug) return undefined;
  switch (folder) {
    case "poses":
      return POSE_IMAGES[slug];
    case "chapters":
      return CHAPTER_IMAGES[slug];
    case "anatomy":
      return ANATOMY_IMAGES[slug];
  }
}
