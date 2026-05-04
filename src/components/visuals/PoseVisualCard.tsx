import { Card, CardContent } from "@/components/ui/card";

interface PoseVisualCardProps {
  poseSlug?: string;
  title?: string;
}

function PoseLines({ poseSlug }: { poseSlug?: string }) {
  switch (poseSlug) {
    case "downward-facing-dog":
      return (
        <>
          <path d="M60 220 L120 105 L205 220" />
          <path d="M120 105 L95 218" />
          <path d="M205 220 L232 220" />
          <circle cx="120" cy="87" r="14" />
        </>
      );
    case "warrior-ii":
      return (
        <>
          <path d="M48 148 L214 148" />
          <path d="M128 92 L128 198" />
          <path d="M128 198 L76 232" />
          <path d="M128 198 L194 232" />
          <circle cx="128" cy="72" r="14" />
        </>
      );
    case "triangle-pose":
      return (
        <>
          <path d="M74 226 L196 226" />
          <path d="M76 226 L130 130 L196 226" />
          <path d="M130 130 L94 92" />
          <path d="M130 130 L174 82" />
          <circle cx="181" cy="72" r="13" />
        </>
      );
    case "childs-pose":
      return (
        <>
          <path d="M72 210 C100 150 155 148 190 210" />
          <path d="M86 212 C128 236 170 232 208 212" />
          <path d="M104 154 L68 182" />
          <circle cx="118" cy="140" r="13" />
        </>
      );
    case "cobra-pose":
      return (
        <>
          <path d="M66 226 C120 226 166 222 214 226" />
          <path d="M108 220 C115 150 148 140 176 190" />
          <path d="M134 174 L104 218" />
          <path d="M148 174 L180 218" />
          <circle cx="160" cy="130" r="13" />
        </>
      );
    case "bridge-pose":
      return (
        <>
          <path d="M60 226 L92 226" />
          <path d="M92 226 C118 154 162 154 190 226" />
          <path d="M190 226 L226 226" />
          <path d="M96 226 L86 190" />
          <path d="M186 226 L196 190" />
          <circle cx="74" cy="224" r="13" />
        </>
      );
    case "seated-forward-fold":
      return (
        <>
          <path d="M58 226 L222 226" />
          <path d="M106 216 C122 142 172 154 212 210" />
          <path d="M120 166 L88 224" />
          <circle cx="132" cy="142" r="13" />
        </>
      );
    default:
      return (
        <>
          <path d="M130 78 L130 202" />
          <path d="M82 128 L178 128" />
          <path d="M130 202 L92 262" />
          <path d="M130 202 L168 262" />
          <circle cx="130" cy="56" r="16" />
        </>
      );
  }
}

export function PoseVisualCard({ poseSlug, title = "Key visual" }: PoseVisualCardProps) {
  return (
    <Card className="bg-white/70">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{title}</span>
          <span>abstract line study</span>
        </div>
        <div className="rounded-[2rem] border border-border/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.86),rgba(239,244,235,0.65))] p-5">
          <svg
            viewBox="0 0 280 280"
            className="mx-auto aspect-square w-full max-w-[300px]"
            role="img"
            aria-label={`${title} の抽象線画`}
          >
            <g
              fill="none"
              stroke="#3f3a34"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="7"
              opacity="0.9"
            >
              <PoseLines poseSlug={poseSlug} />
            </g>
            <path
              d="M46 236 C98 250 182 250 234 236"
              fill="none"
              stroke="#be7d61"
              strokeLinecap="round"
              strokeWidth="3"
              opacity="0.45"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
