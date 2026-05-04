import { cn } from "@/lib/utils";

/**
 * Hand-drawn-feeling SVG silhouettes for the major teaching poses. Each
 * silhouette is rendered with a soft mat (the floor / horizon line) and a
 * stylized figure made from rounded paths — designed to feel like an
 * illustrated yoga workbook rather than a stock photo.
 *
 * The silhouettes intentionally use minimal anatomical detail; the goal is
 * a recognisable shape that pairs with the lesson's accent gradient on a
 * tile. Add new variants here as new poses are introduced.
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

const inkBase = "rgba(45, 41, 36, 0.78)";
const accentBase = "rgba(255, 253, 248, 0.18)";

export function PoseSilhouette({
  shape,
  className,
  ariaLabel,
}: {
  shape: PoseShape;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={cn("h-full w-full", className)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <defs>
        <linearGradient id="mat-shadow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accentBase} />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
      </defs>
      {/* Mat / horizon line — keeps figures grounded. */}
      <ellipse cx="100" cy="138" rx="78" ry="6" fill="url(#mat-shadow)" />
      <Body shape={shape} />
    </svg>
  );
}

function Body({ shape }: { shape: PoseShape }) {
  switch (shape) {
    case "downward-facing-dog":
      return (
        <g fill={inkBase}>
          {/* Inverted V — hands forward, hips back */}
          <path d="M30 132 C 60 80, 92 50, 100 38 C 108 50, 140 80, 170 132" stroke={inkBase} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="132" r="5" />
          <circle cx="168" cy="132" r="5" />
          <circle cx="100" cy="34" r="6.5" />
        </g>
      );
    case "warrior-ii":
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* Wide stance, arms outstretched */}
          <line x1="30" y1="80" x2="170" y2="80" />
          <circle cx="100" cy="46" r="9" fill={inkBase} />
          <line x1="100" y1="55" x2="100" y2="100" />
          <path d="M100 100 L70 134" />
          <path d="M100 100 L138 134" />
          <circle cx="68" cy="135" r="4" fill={inkBase} />
          <circle cx="140" cy="135" r="4" fill={inkBase} />
          <circle cx="32" cy="80" r="4" fill={inkBase} />
          <circle cx="168" cy="80" r="4" fill={inkBase} />
        </g>
      );
    case "triangle-pose":
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="76" cy="42" r="9" fill={inkBase} />
          <line x1="76" y1="51" x2="100" y2="100" />
          <line x1="100" y1="100" x2="68" y2="134" />
          <line x1="100" y1="100" x2="148" y2="134" />
          <line x1="60" y1="62" x2="160" y2="106" />
          <circle cx="60" cy="62" r="4" fill={inkBase} />
          <circle cx="160" cy="106" r="4" fill={inkBase} />
        </g>
      );
    case "cobra-pose":
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* Lying on belly, lifting chest */}
          <path d="M40 130 C 80 124, 120 122, 162 124" />
          <path d="M70 124 C 70 100, 88 86, 108 78" />
          <circle cx="116" cy="72" r="9" fill={inkBase} />
          <path d="M70 124 L60 134" />
          <path d="M88 116 L80 134" />
        </g>
      );
    case "bridge-pose":
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* Hips lifted, feet and shoulders down */}
          <path d="M40 130 C 60 130, 70 130, 80 130" />
          <path d="M120 130 C 130 130, 140 130, 160 130" />
          <path d="M80 130 C 90 84, 110 84, 120 130" />
          <circle cx="40" cy="130" r="9" fill={inkBase} />
          <circle cx="160" cy="130" r="6" fill={inkBase} />
        </g>
      );
    case "childs-pose":
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* Folded forward, knees down */}
          <path d="M50 130 C 80 130, 110 130, 150 130" />
          <path d="M150 130 C 110 110, 84 100, 70 90" />
          <circle cx="64" cy="86" r="8" fill={inkBase} />
          <path d="M70 90 C 60 88, 52 92, 46 100" />
        </g>
      );
    case "seated-forward-fold":
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 130 L 170 130" />
          <path d="M70 130 C 80 102, 100 92, 130 86" />
          <circle cx="138" cy="84" r="8" fill={inkBase} />
          <path d="M138 84 L 168 100" />
        </g>
      );
    case "mountain-pose":
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="100" cy="42" r="9" fill={inkBase} />
          <line x1="100" y1="51" x2="100" y2="130" />
          <line x1="100" y1="65" x2="80" y2="100" />
          <line x1="100" y1="65" x2="120" y2="100" />
          <line x1="92" y1="130" x2="92" y2="135" />
          <line x1="108" y1="130" x2="108" y2="135" />
        </g>
      );
    case "tree-pose":
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="100" cy="36" r="9" fill={inkBase} />
          <line x1="100" y1="45" x2="100" y2="130" />
          <path d="M100 60 L80 38" />
          <path d="M100 60 L120 38" />
          <path d="M100 95 C 116 88, 124 102, 100 110" />
        </g>
      );
    default:
      return (
        <g fill="none" stroke={inkBase} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="100" cy="46" r="9" fill={inkBase} />
          <line x1="100" y1="55" x2="100" y2="120" />
          <path d="M100 70 L80 100" />
          <path d="M100 70 L120 100" />
          <path d="M100 120 L88 134" />
          <path d="M100 120 L112 134" />
        </g>
      );
  }
}

/**
 * A finished tile that wraps a silhouette in a colored gradient — used as the
 * thumbnail on lesson/pose/practice cards.
 */
export function PoseSilhouetteTile({
  shape,
  gradient,
  label,
  sublabel,
  className,
}: {
  shape: PoseShape;
  gradient: string;
  label?: string;
  sublabel?: string;
  className?: string;
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
            "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
        }}
      />
      <PoseSilhouette shape={shape} className="relative z-10" ariaLabel={label} />
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
