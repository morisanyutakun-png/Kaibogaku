import Link from "next/link";
import { ArrowRight, PersonStanding } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CautionBadge } from "@/components/content/CautionBadge";
import { SourceBadge } from "@/components/content/SourceBadge";
import type { Pose } from "@/types/content";

export function PoseCard({ pose }: { pose: Pose }) {
  return (
    <Link href={`/poses/${pose.slug}`} className="group block h-full">
      <Card className="h-full bg-white/70 p-0 transition duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-[0_18px_50px_rgba(69,58,45,0.10)]">
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-sage-50 text-sage-800">
              <PersonStanding className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-wrap justify-end gap-2">
              <CautionBadge level={pose.cautionLevel} />
              <SourceBadge count={pose.sourceIds.length} />
            </div>
          </div>
          <h3 className="text-lg font-semibold tracking-[-0.01em]">{pose.nameJa}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {pose.nameEn}
            {pose.sanskritName ? ` / ${pose.sanskritName}` : ""}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{pose.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {pose.bodyAreas.slice(0, 4).map((area) => (
              <Badge key={area} variant="outline" className="rounded-full bg-white/60">
                {area}
              </Badge>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
            <span>{pose.difficulty}</span>
            <span className="line-clamp-1">{pose.teachingFocus[0]}</span>
            <ArrowRight
              className="size-4 shrink-0 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
