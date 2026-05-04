import { Card, CardContent } from "@/components/ui/card";

interface PoseVisualCardProps {
  poseSlug?: string;
  title?: string;
}

function JointDots({ points }: { points: Array<[number, number]> }) {
  return (
    <g fill="#fffdf8" stroke="#6f8b6b" strokeWidth="2">
      {points.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
      ))}
    </g>
  );
}

function FigureStroke({
  d,
  width = 16,
  tone = "skin",
}: {
  d: string;
  width?: number;
  tone?: "skin" | "line";
}) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke="#2d2924"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={width + 3}
      />
      <path
        d={d}
        fill="none"
        stroke={tone === "skin" ? "#f1cdbd" : "#2d2924"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={width}
      />
    </>
  );
}

function PoseFigure({ poseSlug }: { poseSlug?: string }) {
  switch (poseSlug) {
    case "downward-facing-dog":
      return (
        <>
          <FigureStroke d="M92 207 L128 122 L187 206" width={20} />
          <FigureStroke d="M128 122 L78 210" width={15} />
          <FigureStroke d="M187 206 L226 214" width={15} />
          <FigureStroke d="M128 122 C149 141 167 171 187 206" width={18} />
          <circle cx="117" cy="105" r="14" fill="#f1cdbd" stroke="#2d2924" strokeWidth="2" />
          <JointDots
            points={[
              [128, 122],
              [92, 207],
              [187, 206],
              [78, 210],
              [226, 214],
            ]}
          />
        </>
      );
    case "warrior-ii":
      return (
        <>
          <FigureStroke d="M63 140 L217 140" width={13} />
          <FigureStroke d="M140 93 L140 191" width={18} />
          <FigureStroke d="M140 191 L82 226" width={18} />
          <FigureStroke d="M140 191 L216 226" width={18} />
          <circle cx="140" cy="72" r="15" fill="#f1cdbd" stroke="#2d2924" strokeWidth="2" />
          <JointDots
            points={[
              [140, 93],
              [140, 191],
              [82, 226],
              [216, 226],
              [63, 140],
              [217, 140],
            ]}
          />
        </>
      );
    case "triangle-pose":
      return (
        <>
          <FigureStroke d="M77 222 L207 222" width={17} />
          <FigureStroke d="M90 221 L136 143 L207 222" width={17} />
          <FigureStroke d="M136 143 L98 94" width={13} />
          <FigureStroke d="M136 143 L183 91" width={13} />
          <circle cx="191" cy="76" r="14" fill="#f1cdbd" stroke="#2d2924" strokeWidth="2" />
          <JointDots
            points={[
              [136, 143],
              [90, 221],
              [207, 222],
              [98, 94],
              [183, 91],
            ]}
          />
        </>
      );
    case "childs-pose":
      return (
        <>
          <FigureStroke d="M83 211 C107 158 157 150 195 211" width={23} />
          <FigureStroke d="M92 214 C127 238 177 237 219 212" width={18} />
          <FigureStroke d="M116 163 L72 194" width={14} />
          <circle cx="125" cy="144" r="14" fill="#f1cdbd" stroke="#2d2924" strokeWidth="2" />
          <JointDots
            points={[
              [116, 163],
              [83, 211],
              [195, 211],
              [72, 194],
              [219, 212],
            ]}
          />
        </>
      );
    case "cobra-pose":
      return (
        <>
          <FigureStroke d="M69 224 C124 224 171 222 219 224" width={17} />
          <FigureStroke d="M111 216 C115 156 148 139 181 190" width={22} />
          <FigureStroke d="M137 172 L108 220" width={14} />
          <FigureStroke d="M153 174 L190 220" width={14} />
          <circle cx="160" cy="128" r="14" fill="#f1cdbd" stroke="#2d2924" strokeWidth="2" />
          <JointDots
            points={[
              [137, 172],
              [153, 174],
              [108, 220],
              [190, 220],
              [219, 224],
            ]}
          />
        </>
      );
    case "bridge-pose":
      return (
        <>
          <FigureStroke d="M65 224 L95 224" width={16} />
          <FigureStroke d="M94 224 C119 154 164 154 192 224" width={22} />
          <FigureStroke d="M192 224 L225 224" width={16} />
          <FigureStroke d="M98 223 L88 190" width={14} />
          <FigureStroke d="M186 223 L200 190" width={14} />
          <circle cx="74" cy="220" r="14" fill="#f1cdbd" stroke="#2d2924" strokeWidth="2" />
          <JointDots
            points={[
              [94, 224],
              [192, 224],
              [88, 190],
              [200, 190],
              [225, 224],
            ]}
          />
        </>
      );
    case "seated-forward-fold":
      return (
        <>
          <FigureStroke d="M60 226 L224 226" width={17} />
          <FigureStroke d="M107 217 C121 151 174 155 214 209" width={22} />
          <FigureStroke d="M121 170 L88 224" width={14} />
          <circle cx="133" cy="144" r="14" fill="#f1cdbd" stroke="#2d2924" strokeWidth="2" />
          <JointDots
            points={[
              [107, 217],
              [214, 209],
              [88, 224],
              [224, 226],
              [121, 170],
            ]}
          />
        </>
      );
    default:
      return (
        <>
          <FigureStroke d="M140 80 L140 199" width={21} />
          <FigureStroke d="M90 130 L190 130" width={14} />
          <FigureStroke d="M140 199 L96 261" width={17} />
          <FigureStroke d="M140 199 L184 261" width={17} />
          <circle cx="140" cy="55" r="17" fill="#f1cdbd" stroke="#2d2924" strokeWidth="2" />
          <JointDots
            points={[
              [140, 80],
              [140, 199],
              [90, 130],
              [190, 130],
              [96, 261],
              [184, 261],
            ]}
          />
        </>
      );
  }
}

export function PoseVisualCard({ poseSlug, title = "Key visual" }: PoseVisualCardProps) {
  return (
    <Card className="bg-white/75">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{title}</span>
          <span>pose anatomy sketch</span>
        </div>
        <div className="rounded-[2rem] border border-border/70 bg-[linear-gradient(145deg,rgba(255,253,248,0.96),rgba(238,244,235,0.72))] p-5">
          <svg
            viewBox="0 0 280 280"
            className="mx-auto aspect-square w-full max-w-[300px]"
            role="img"
            aria-label={`${title} の人物イラスト`}
          >
            <path
              d="M44 236 C95 251 186 251 236 236"
              fill="none"
              stroke="#e7d4b8"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <g opacity="0.97">
              <PoseFigure poseSlug={poseSlug} />
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
