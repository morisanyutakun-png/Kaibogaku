import { cn } from "@/lib/utils";

interface BodyMapIllustrationProps {
  highlights?: string[];
  className?: string;
  caption?: string;
}

/**
 * A meditative breath-mandala that replaces the old anatomical figure.
 * The previous diagram had too much line noise to be recognisable on
 * mobile; this version uses concentric breath rings, soft halos, and
 * Japanese kanji labels for the body regions referenced in the lesson —
 * the same information, but as an atmosphere rather than a figure.
 */
const REGIONS: Array<{ key: string; label: string; angle: number }> = [
  { key: "肩", label: "肩", angle: -90 },
  { key: "胸", label: "胸郭", angle: -30 },
  { key: "脊", label: "脊柱", angle: 30 },
  { key: "股", label: "骨盤", angle: 90 },
  { key: "ハム", label: "脚", angle: 150 },
  { key: "息", label: "呼吸", angle: 210 },
];

function isHighlighted(highlight: string, key: string) {
  return highlight.includes(key) || key.includes(highlight);
}

export function BodyMapIllustration({
  highlights = [],
  className,
  caption,
}: BodyMapIllustrationProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-[0_18px_45px_rgba(45,41,36,0.10)] backdrop-blur-xl",
        className
      )}
      aria-label="呼吸と身体部位を示すマンダラ図"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[320px]">
        <svg
          viewBox="0 0 320 320"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="halo-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dce9d7" stopOpacity="0.92" />
              <stop offset="55%" stopColor="#dce9d7" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#dce9d7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="halo-warm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f3e8d7" stopOpacity="0.0" />
              <stop offset="60%" stopColor="#e6baa8" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#be7d61" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          <circle cx="160" cy="160" r="155" fill="url(#halo-warm)" />
          <circle cx="160" cy="160" r="120" fill="url(#halo-core)" className="animate-breathe origin-center" style={{ transformOrigin: "160px 160px" }} />

          {/* Concentric breath rings */}
          {[58, 84, 112].map((r, i) => (
            <circle
              key={r}
              cx="160"
              cy="160"
              r={r}
              fill="none"
              stroke="#a8c09f"
              strokeOpacity={0.18 + i * 0.06}
              strokeWidth="1"
              strokeDasharray={i === 1 ? "2 5" : undefined}
            />
          ))}

          {/* Subtle radial spokes */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="160"
              y1="160"
              x2="160"
              y2="36"
              stroke="#a8c09f"
              strokeOpacity="0.08"
              strokeWidth="0.8"
              transform={`rotate(${i * 30} 160 160)`}
            />
          ))}

          {/* Center glyph */}
          <text
            x="160"
            y="178"
            textAnchor="middle"
            fontFamily="var(--font-serif)"
            fontWeight="600"
            fontSize="56"
            fill="#465c42"
            opacity="0.86"
          >
            息
          </text>
        </svg>

        {/* Region labels around the ring */}
        {REGIONS.map((region) => {
          const active = highlights.some((h) => isHighlighted(h, region.key));
          const rad = (region.angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * 42;
          const y = 50 + Math.sin(rad) * 42;
          return (
            <span
              key={region.key}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium transition",
                active
                  ? "bg-sage-900 text-card shadow-[0_8px_18px_rgba(49,68,47,0.32)]"
                  : "bg-card/85 text-muted-foreground ring-1 ring-border/70"
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {region.label}
            </span>
          );
        })}
      </div>

      {caption && (
        <figcaption className="mt-4 text-center text-[12px] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
