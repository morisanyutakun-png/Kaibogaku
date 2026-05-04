import { cn } from "@/lib/utils";

interface BodyMapIllustrationProps {
  highlights?: string[];
  className?: string;
}

function isHighlighted(highlights: string[], keys: string[]) {
  return keys.some((key) => highlights.some((highlight) => highlight.includes(key)));
}

function highlightClass(isActive: boolean) {
  return isActive ? "opacity-100" : "opacity-25";
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
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-white/72 p-5 shadow-sm",
        className
      )}
      aria-label="肩、胸郭、脊柱、骨盤を淡く示した人体イラスト"
      role="img"
    >
      <svg viewBox="0 0 320 420" className="relative mx-auto h-[360px] w-full max-w-[290px]">
        <path
          d="M64 372 C112 390 208 390 256 372"
          fill="none"
          stroke="#e7d4b8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <g fill="#fff8ed" stroke="#776d62" strokeLinecap="round" strokeLinejoin="round">
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

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M116 111 C129 101 145 96 160 96 C175 96 191 101 204 111"
            stroke="#6f8b6b"
            strokeWidth="8"
            className={highlightClass(shoulder)}
          />
          <circle
            cx="119"
            cy="114"
            r="11"
            fill="#eef4eb"
            stroke="#6f8b6b"
            strokeWidth="2"
            className={highlightClass(shoulder)}
          />
          <circle
            cx="201"
            cy="114"
            r="11"
            fill="#eef4eb"
            stroke="#6f8b6b"
            strokeWidth="2"
            className={highlightClass(shoulder)}
          />
          <ellipse
            cx="160"
            cy="162"
            rx="43"
            ry="45"
            fill="#eef4eb"
            stroke="#6f8b6b"
            strokeWidth="2.6"
            className={highlightClass(rib)}
          />
          <path
            d="M123 160 C140 171 180 171 197 160"
            stroke="#be7d61"
            strokeWidth="2.2"
            className={highlightClass(rib)}
          />
          <path
            d="M160 96 C157 128 164 154 158 190 C155 209 160 231 160 257"
            stroke="#6f8b6b"
            strokeWidth="6"
            className={highlightClass(spine)}
          />
          <path
            d="M128 226 C145 214 175 214 192 226 C183 239 137 239 128 226Z"
            fill="#faeee9"
            stroke="#be7d61"
            strokeWidth="2.6"
            className={highlightClass(hip)}
          />
          <circle
            cx="132"
            cy="236"
            r="7"
            fill="#faeee9"
            stroke="#be7d61"
            strokeWidth="2"
            className={highlightClass(hip)}
          />
          <circle
            cx="188"
            cy="236"
            r="7"
            fill="#faeee9"
            stroke="#be7d61"
            strokeWidth="2"
            className={highlightClass(hip)}
          />
        </g>

        <g className="text-[11px] font-medium" fill="#514a42">
          <text x="36" y="118">
            肩
          </text>
          <path d="M55 115 L105 115" stroke="#b6afa5" strokeWidth="1.4" />
          <text x="219" y="158">
            胸郭
          </text>
          <path d="M214 156 L190 162" stroke="#b6afa5" strokeWidth="1.4" />
          <text x="220" y="223">
            脊柱
          </text>
          <path d="M214 220 L166 212" stroke="#b6afa5" strokeWidth="1.4" />
          <text x="36" y="246">
            骨盤
          </text>
          <path d="M66 242 L124 230" stroke="#b6afa5" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  );
}
