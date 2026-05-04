import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The old "stick-figure" silhouette has been replaced by an editorial
 * composition: a refined gradient mat + a serif kanji glyph that names
 * the pose's primary intention (downward dog → 屈, warrior → 戦, etc.).
 *
 * If the user drops `/public/images/poses/{slug}.webp` (or .jpg), the
 * tile uses that photograph instead — so AI-generated yoga photography
 * upgrades the entire app without touching component code.
 *
 * The shape API is preserved so existing call sites keep working.
 */
export type PoseShape =
  | "downward-facing-dog"
  | "warrior-ii"
  | "triangle-pose"
  | "cobra-pose"
  | "bridge-pose"
  | "childs-pose"
  | "seated-forward-fold"
  | "mountain-pose"
  | "tree-pose"
  | "default";

const POSE_GLYPH: Record<PoseShape, string> = {
  "downward-facing-dog": "屈",
  "warrior-ii": "戦",
  "triangle-pose": "三",
  "cobra-pose": "蛇",
  "bridge-pose": "橋",
  "childs-pose": "息",
  "seated-forward-fold": "伏",
  "mountain-pose": "山",
  "tree-pose": "樹",
  default: "形",
};

const POSE_NAME: Record<PoseShape, string> = {
  "downward-facing-dog": "Downward Dog",
  "warrior-ii": "Warrior II",
  "triangle-pose": "Triangle",
  "cobra-pose": "Cobra",
  "bridge-pose": "Bridge",
  "childs-pose": "Child's Pose",
  "seated-forward-fold": "Forward Fold",
  "mountain-pose": "Mountain",
  "tree-pose": "Tree",
  default: "Asana",
};

export function PoseSilhouette({
  shape,
  className,
  ariaLabel,
  imageSrc,
}: {
  shape: PoseShape;
  className?: string;
  ariaLabel?: string;
  imageSrc?: string;
}) {
  const glyph = POSE_GLYPH[shape] ?? "形";
  const name = POSE_NAME[shape] ?? "Asana";

  return (
    <div
      className={cn("relative h-full w-full", className)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={ariaLabel ?? ""}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            aria-hidden
            className="album-glyph select-none text-card"
            style={{
              fontSize: "clamp(56px, 18vw, 120px)",
              textShadow: "0 1px 0 rgba(255,255,255,0.16), 0 8px 26px rgba(0,0,0,0.18)",
              opacity: 0.94,
              letterSpacing: "-0.02em",
            }}
          >
            {glyph}
          </span>
        </div>
      )}
      <span
        aria-hidden
        className="absolute bottom-3 right-4 z-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-card/75"
      >
        {name}
      </span>
    </div>
  );
}

/**
 * A finished tile that wraps the composition in a colored gradient. The
 * gradient stays underneath the image when present, and acts as the
 * primary surface when no photo is supplied.
 */
export function PoseSilhouetteTile({
  shape,
  gradient,
  label,
  sublabel,
  className,
  imageSrc,
}: {
  shape: PoseShape;
  gradient: string;
  label?: string;
  sublabel?: string;
  className?: string;
  imageSrc?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        gradient,
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.24), transparent 55%), radial-gradient(110% 90% at 0% 100%, rgba(0,0,0,0.28), transparent 55%)",
        }}
      />
      <PoseSilhouette
        shape={shape}
        className="relative z-10"
        ariaLabel={label}
        imageSrc={imageSrc}
      />
      {imageSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(45, 41, 36, 0.04) 0%, rgba(45, 41, 36, 0.46) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      )}
      {(label || sublabel) && (
        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-end justify-between text-card">
          {label && (
            <div>
              <div className="text-[12px] font-semibold leading-tight tracking-tight">
                {label}
              </div>
              {sublabel && (
                <div className="text-[10.5px] opacity-80">{sublabel}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SHAPES = new Set<PoseShape>([
  "downward-facing-dog",
  "warrior-ii",
  "triangle-pose",
  "cobra-pose",
  "bridge-pose",
  "childs-pose",
  "seated-forward-fold",
  "mountain-pose",
  "tree-pose",
]);

export function shapeForSlug(slug: string): PoseShape {
  return SHAPES.has(slug as PoseShape) ? (slug as PoseShape) : "default";
}
