import { cn } from "@/lib/utils";

interface BodyMapIllustrationProps {
  highlights?: string[];
  className?: string;
}

function isHighlighted(highlights: string[], keys: string[]) {
  return keys.some((key) => highlights.some((highlight) => highlight.includes(key)));
}

export function BodyMapIllustration({ highlights = [], className }: BodyMapIllustrationProps) {
  const normalized = highlights.map((highlight) => highlight.toLowerCase());

  const shoulder = isHighlighted(normalized, ["肩", "shoulder"]);
  const rib = isHighlighted(normalized, ["胸", "rib", "呼吸", "横隔膜"]);
  const spine = isHighlighted(normalized, ["脊", "spine", "腰"]);
  const hip = isHighlighted(normalized, ["股", "骨盤", "hip", "pelvis"]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-white/60 p-6 shadow-sm",
        className
      )}
      aria-label="抽象的な人体図"
      role="img"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(132,155,130,0.15),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(190,125,97,0.10),transparent_32%)]" />
      <svg viewBox="0 0 260 360" className="relative mx-auto h-[310px] w-full max-w-[240px]">
        <defs>
          <filter id="bodyGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="130" cy="45" r="24" fill="none" stroke="#3f3a34" strokeWidth="2" />
        <path
          d="M130 72 C121 94 116 118 118 146 C119 172 119 202 112 232"
          fill="none"
          stroke="#3f3a34"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M130 72 C139 96 145 122 143 148 C141 176 143 204 151 232"
          fill="none"
          stroke="#3f3a34"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M76 112 C102 92 158 92 184 112"
          fill="none"
          stroke={shoulder ? "#6f8b6b" : "#b6afa5"}
          strokeWidth={shoulder ? "9" : "5"}
          strokeLinecap="round"
          filter={shoulder ? "url(#bodyGlow)" : undefined}
          opacity={shoulder ? "0.85" : "0.45"}
        />
        <path
          d="M76 112 C62 146 55 177 50 218"
          fill="none"
          stroke="#3f3a34"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M184 112 C198 146 205 177 210 218"
          fill="none"
          stroke="#3f3a34"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse
          cx="130"
          cy="145"
          rx="50"
          ry="42"
          fill={rib ? "#eef4eb" : "none"}
          stroke={rib ? "#6f8b6b" : "#c9c1b7"}
          strokeWidth={rib ? "3" : "1.6"}
        />
        <path
          d="M95 142 C112 154 148 154 165 142"
          fill="none"
          stroke={rib ? "#be7d61" : "#c9c1b7"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M130 90 C128 125 133 162 128 210 C127 232 132 250 130 270"
          fill="none"
          stroke={spine ? "#6f8b6b" : "#b6afa5"}
          strokeWidth={spine ? "8" : "3"}
          strokeLinecap="round"
          opacity={spine ? "0.8" : "0.6"}
          filter={spine ? "url(#bodyGlow)" : undefined}
        />
        <path
          d="M92 224 C111 210 149 210 168 224 C157 241 103 241 92 224Z"
          fill={hip ? "#f8ebe4" : "none"}
          stroke={hip ? "#be7d61" : "#c9c1b7"}
          strokeWidth={hip ? "3" : "1.6"}
        />
        <path
          d="M112 238 C104 274 94 306 82 336"
          fill="none"
          stroke="#3f3a34"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M150 238 C158 274 166 306 178 336"
          fill="none"
          stroke="#3f3a34"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
