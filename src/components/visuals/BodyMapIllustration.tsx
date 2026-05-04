import { cn } from "@/lib/utils";

interface BodyMapIllustrationProps {
  highlights?: string[];
  className?: string;
  caption?: string;
}

function isHighlighted(highlights: string[], keys: string[]) {
  return keys.some((key) => highlights.some((highlight) => highlight.includes(key)));
}

/**
 * A stylized anatomical figure used on the home hero. Highlighted regions
 * (passed in by Japanese keyword: 肩、胸郭、脊柱、股関節, etc.) animate up
 * to full opacity with a soft tint while the rest of the body sits quietly
 * behind. The intent is "attention-directing diagram", not a medical chart.
 */
export function BodyMapIllustration({
  highlights = [],
  className,
  caption,
}: BodyMapIllustrationProps) {
  const normalized = highlights.map((highlight) => highlight.toLowerCase());

  const shoulder = isHighlighted(normalized, ["肩", "shoulder"]);
  const rib = isHighlighted(normalized, ["胸", "rib", "呼吸", "横隔膜"]);
  const spine = isHighlighted(normalized, ["脊", "spine", "腰"]);
  const hip = isHighlighted(normalized, ["股", "骨盤", "hip", "pelvis"]);
  const hams = isHighlighted(normalized, ["ハム", "ham", "もも"]);

  const dim = "transition-opacity duration-500";
  const on = "opacity-100";
  const off = "opacity-25";

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/85 p-5 shadow-[0_18px_45px_rgba(45,41,36,0.10)] backdrop-blur-xl",
        className
      )}
      aria-label="肩、胸郭、脊柱、骨盤、ハムストリングスを示した人体イラスト"
    >
      {/* Background mandala — quiet but present */}
      <svg
        viewBox="0 0 320 320"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="halo" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#dce9d7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#dce9d7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="135" r="140" fill="url(#halo)" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="160"
            y1="135"
            x2="160"
            y2="0"
            stroke="#a8c09f"
            strokeOpacity="0.10"
            strokeWidth="0.8"
            transform={`rotate(${i * 30} 160 135)`}
          />
        ))}
      </svg>

      <svg
        viewBox="0 0 320 420"
        className="relative mx-auto h-[360px] w-full max-w-[290px]"
        aria-hidden="true"
      >
        {/* Floor shadow */}
        <ellipse cx="160" cy="384" rx="98" ry="6" fill="#e7d4b8" opacity="0.5" />

        {/* Body — base layer (kept light so highlights pop) */}
        <g
          fill="#fff8ed"
          stroke="#9b9385"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="160" cy="52" r="25" fill="#f4d6c7" strokeWidth="2.2" />
          <path d="M149 77 L171 77 L176 101 L144 101 Z" strokeWidth="2" />
          <path
            d="M112 110 C126 97 143 92 160 93 C177 92 194 97 208 110 C201 148 198 181 199 218 C187 229 174 235 160 235 C146 235 133 229 121 218 C122 181 119 148 112 110Z"
            strokeWidth="2.2"
          />
          <path
            d="M112 113 C96 132 85 161 75 211 C72 227 79 242 93 243 C106 244 113 233 115 219 C121 177 129 145 143 122 C133 119 123 116 112 113Z"
            strokeWidth="2.2"
          />
          <path
            d="M208 113 C224 132 235 161 245 211 C248 227 241 242 227 243 C214 244 207 233 205 219 C199 177 191 145 177 122 C187 119 197 116 208 113Z"
            strokeWidth="2.2"
          />
          <path
            d="M124 221 C143 238 177 238 196 221 C202 240 200 256 189 267 C173 280 147 280 131 267 C120 256 118 240 124 221Z"
            strokeWidth="2.2"
          />
          <path
            d="M134 267 C123 299 118 334 115 373 C114 388 124 398 138 396 C151 394 157 383 158 369 C162 331 164 300 162 276 C153 276 143 272 134 267Z"
            strokeWidth="2.2"
          />
          <path
            d="M186 267 C197 299 202 334 205 373 C206 388 196 398 182 396 C169 394 163 383 162 369 C158 331 156 300 158 276 C167 276 177 272 186 267Z"
            strokeWidth="2.2"
          />
        </g>

        {/* Highlight overlay — sage/clay tinted */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Shoulders */}
          <g className={cn(dim, shoulder ? on : off)}>
            <path
              d="M116 111 C129 101 145 96 160 96 C175 96 191 101 204 111"
              stroke="#6f8b6b"
              strokeWidth="9"
            />
            <circle cx="119" cy="114" r="11" fill="#eef4eb" stroke="#6f8b6b" strokeWidth="2" />
            <circle cx="201" cy="114" r="11" fill="#eef4eb" stroke="#6f8b6b" strokeWidth="2" />
            {shoulder && <circle cx="160" cy="103" r="34" fill="none" stroke="#a8c09f" strokeWidth="1.4" strokeDasharray="2 4" className="animate-breathe origin-center" style={{ transformOrigin: "160px 103px" }} />}
          </g>

          {/* Rib cage */}
          <g className={cn(dim, rib ? on : off)}>
            <ellipse cx="160" cy="162" rx="43" ry="45" fill="#eef4eb" stroke="#6f8b6b" strokeWidth="2.6" />
            <path d="M123 160 C140 171 180 171 197 160" stroke="#be7d61" strokeWidth="2.2" />
            <path d="M126 142 C146 152 174 152 194 142" stroke="#be7d61" strokeWidth="1.6" opacity="0.6" />
            <path d="M122 178 C144 188 176 188 198 178" stroke="#be7d61" strokeWidth="1.6" opacity="0.6" />
          </g>

          {/* Spine */}
          <g className={cn(dim, spine ? on : off)}>
            <path
              d="M160 96 C157 128 164 154 158 190 C155 209 160 231 160 257"
              stroke="#6f8b6b"
              strokeWidth="6"
            />
            {[110, 138, 166, 194, 222, 250].map((y) => (
              <circle key={y} cx={158 + Math.sin(y / 12) * 1.5} cy={y} r="3.6" fill="#566f51" />
            ))}
          </g>

          {/* Hip / pelvis */}
          <g className={cn(dim, hip ? on : off)}>
            <path
              d="M128 226 C145 214 175 214 192 226 C183 239 137 239 128 226Z"
              fill="#faeee9"
              stroke="#be7d61"
              strokeWidth="2.6"
            />
            <circle cx="132" cy="236" r="7" fill="#faeee9" stroke="#be7d61" strokeWidth="2" />
            <circle cx="188" cy="236" r="7" fill="#faeee9" stroke="#be7d61" strokeWidth="2" />
          </g>

          {/* Hamstrings */}
          <g className={cn(dim, hams ? on : off)}>
            <path
              d="M138 285 C 134 318, 132 350, 134 380"
              stroke="#be7d61"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M182 285 C 186 318, 188 350, 186 380"
              stroke="#be7d61"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>

        {/* Labels */}
        <g className="text-[11px] font-medium" fill="#514a42">
          {shoulder && (
            <>
              <text x="34" y="118">肩</text>
              <path d="M52 115 L105 115" stroke="#a8c09f" strokeWidth="1.4" />
            </>
          )}
          {rib && (
            <>
              <text x="219" y="158">胸郭</text>
              <path d="M214 156 L190 162" stroke="#a8c09f" strokeWidth="1.4" />
            </>
          )}
          {spine && (
            <>
              <text x="220" y="223">脊柱</text>
              <path d="M214 220 L166 212" stroke="#a8c09f" strokeWidth="1.4" />
            </>
          )}
          {hip && (
            <>
              <text x="34" y="246">骨盤</text>
              <path d="M62 242 L124 230" stroke="#a8c09f" strokeWidth="1.4" />
            </>
          )}
          {hams && (
            <>
              <text x="220" y="335">ハムストリングス</text>
              <path d="M214 332 L188 332" stroke="#a8c09f" strokeWidth="1.4" />
            </>
          )}
        </g>
      </svg>

      {caption && (
        <figcaption className="mt-3 text-center text-[12px] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
