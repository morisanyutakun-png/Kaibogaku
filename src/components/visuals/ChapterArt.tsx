import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * ChapterArt — the editorial visual that replaces the stick-figure
 * illustrations across cards. Three layers, in order of fallback:
 *
 *   1. If `/public/images/poses/{slug}.webp` (or .jpg) is present,
 *      render that photograph with a warm-paper overlay.
 *   2. Otherwise, render a refined gradient mesh + a serif chapter
 *      number / kanji glyph as the focal point.
 *   3. A subtle grain layer on top to keep the surface from feeling flat.
 *
 * The intent: the page reads as a magazine/book cover, not a quiz UI.
 * The user can drop AI-generated yoga photos into the public folder
 * and every card upgrades automatically.
 */

export type ChapterArtVariant =
  | "forest"
  | "sage"
  | "sunrise"
  | "terracotta"
  | "river"
  | "dusk"
  | "ink"
  | "clay";

const GRADIENT_CLASS: Record<ChapterArtVariant, string> = {
  forest: "bg-grad-forest",
  sage: "bg-grad-sage",
  sunrise: "bg-grad-sunrise",
  terracotta: "bg-grad-terracotta",
  river: "bg-grad-river",
  dusk: "bg-grad-dusk",
  ink: "bg-grad-ink",
  clay: "bg-grad-clay",
};

interface ChapterArtProps {
  variant?: ChapterArtVariant;
  /** Big serif glyph rendered when no photo is available. e.g. "01", "序", "肩" */
  glyph?: string;
  /** Tiny label printed under the glyph. */
  caption?: string;
  /** Optional remote/static image — if set, it overrides the gradient. */
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  /** Tone the gradient down for foreground content overlap. */
  dim?: boolean;
}

export function ChapterArt({
  variant = "forest",
  glyph,
  caption,
  imageSrc,
  imageAlt = "",
  className,
  dim = false,
}: ChapterArtProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        GRADIENT_CLASS[variant],
        className
      )}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
          priority={false}
        />
      )}

      {/* Soft top-light + bottom-shadow vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.28), transparent 55%), radial-gradient(110% 90% at 0% 100%, rgba(0,0,0,0.32), transparent 55%)",
        }}
      />

      {/* Warm paper overlay if photo present */}
      {imageSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(45, 41, 36, 0.05) 0%, rgba(45, 41, 36, 0.45) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Serif glyph — only when no photo */}
      {!imageSrc && glyph && (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <span
            aria-hidden
            className="album-glyph text-card/95 select-none"
            style={{
              fontSize: "clamp(64px, 22vw, 132px)",
              textShadow: "0 1px 0 rgba(255,255,255,0.18), 0 8px 26px rgba(0,0,0,0.18)",
              letterSpacing: glyph.length > 2 ? "-0.04em" : "-0.02em",
              opacity: dim ? 0.55 : 0.92,
            }}
          >
            {glyph}
          </span>
        </div>
      )}

      {caption && (
        <span className="absolute bottom-3 left-4 right-4 z-20 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-card/80">
          {caption}
        </span>
      )}

      {/* Grain — keeps the gradient from feeling synthetic */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.14 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

/**
 * A registry that maps lesson categories / pose slugs to a (variant, glyph)
 * pair so calls stay terse: `chapterArtFor("入口")`. Glyphs are kanji that
 * carry the lesson's mood — readers don't need to "decode a stick figure".
 */
const CATEGORY_ART: Record<string, { variant: ChapterArtVariant; glyph: string }> = {
  入口: { variant: "forest", glyph: "序" },
  関節: { variant: "sage", glyph: "節" },
  筋肉: { variant: "terracotta", glyph: "筋" },
  呼吸: { variant: "river", glyph: "息" },
  ポーズ応用: { variant: "sunrise", glyph: "形" },
  安全配慮: { variant: "dusk", glyph: "護" },
  まとめ: { variant: "ink", glyph: "結" },
  Foundation: { variant: "forest", glyph: "序" },
  Joints: { variant: "sage", glyph: "節" },
  Muscles: { variant: "terracotta", glyph: "筋" },
  Asana: { variant: "sunrise", glyph: "形" },
  Safety: { variant: "dusk", glyph: "護" },
};

export function chapterArtFor(eyebrow?: string): {
  variant: ChapterArtVariant;
  glyph: string;
} {
  if (!eyebrow) return { variant: "ink", glyph: "学" };
  return CATEGORY_ART[eyebrow] ?? { variant: "ink", glyph: "学" };
}
