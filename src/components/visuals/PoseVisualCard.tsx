import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { PoseSilhouette, shapeForSlug } from "@/components/visuals/PoseSilhouette";

interface PoseVisualCardProps {
  poseSlug?: string;
  title?: string;
  imageSrc?: string;
}

/**
 * The detail-view "key visual" card. Replaces the previous stick-figure
 * sketch with an editorial gradient + serif kanji glyph composition. If
 * a real photograph is supplied (or `/public/images/poses/{slug}.webp`
 * is dropped in by the user), it takes over the surface.
 */
export function PoseVisualCard({
  poseSlug,
  title = "Key visual",
  imageSrc,
}: PoseVisualCardProps) {
  const shape = shapeForSlug(poseSlug ?? "default");
  return (
    <Card className="overflow-hidden bg-white/75 p-0">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{title}</span>
          <span>Asana visual</span>
        </div>
        <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-grad-forest">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.26), transparent 55%), radial-gradient(110% 90% at 0% 100%, rgba(0,0,0,0.32), transparent 55%)",
                }}
              />
              <PoseSilhouette shape={shape} className="relative z-10" ariaLabel={title} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
