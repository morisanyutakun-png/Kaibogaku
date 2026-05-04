import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

import { CautionBadge } from "@/components/content/CautionBadge";
import { PoseSilhouette, shapeForSlug } from "@/components/visuals/PoseSilhouette";
import { cn, toneFor } from "@/lib/utils";
import type { Pose } from "@/types/content";

const GRADIENT_BY_DIFFICULTY: Record<Pose["difficulty"], string> = {
  やさしい: "bg-grad-river",
  標準: "bg-grad-sage",
  注意深く: "bg-grad-dusk",
};

export function PoseCard({ pose }: { pose: Pose }) {
  const tone = toneFor("ポーズ");
  const gradient = GRADIENT_BY_DIFFICULTY[pose.difficulty] ?? tone.gradient;
  return (
    <Link
      href={`/poses/${pose.slug}`}
      className="surface-card group flex h-full flex-col overflow-hidden p-0"
    >
      <div className={cn("relative aspect-[16/10] w-full overflow-hidden", gradient)}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
          }}
        />
        <PoseSilhouette
          shape={shapeForSlug(pose.slug)}
          className="relative z-10 animate-breathe"
          ariaLabel={`${pose.nameJa} のポーズシルエット`}
        />
        <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
          <span className="glass-chip">{pose.difficulty}</span>
          <CautionBadge level={pose.cautionLevel} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[16px] font-semibold leading-snug tracking-tight">{pose.nameJa}</h3>
        <p className="mt-1 text-[11.5px] text-muted-foreground">
          {pose.nameEn}
          {pose.sanskritName ? ` · ${pose.sanskritName}` : ""}
        </p>
        <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-muted-foreground">
          {pose.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {pose.bodyAreas.slice(0, 4).map((area) => (
            <span
              key={area}
              className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {area}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 text-[11.5px] text-muted-foreground">
          <span className="line-clamp-1">{pose.teachingFocus[0]}</span>
          <span className="flex items-center gap-1 text-sage-800">
            <PlayCircle className="size-3.5" />
            {pose.quiz.length}問
            <ArrowRight
              className="ml-0.5 size-3.5 transition group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
