import Link from "next/link";
import { ArrowRight, Bone, Brain, Dumbbell, ScanHeart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SourceBadge } from "@/components/content/SourceBadge";
import type { AnatomyItem } from "@/types/content";

const icons = {
  muscle: Dumbbell,
  joint: ScanHeart,
  bone: Bone,
  concept: Brain,
};

const typeLabel = {
  muscle: "筋肉",
  joint: "関節",
  bone: "骨",
  concept: "概念",
};

export function AnatomyCard({ item }: { item: AnatomyItem }) {
  const Icon = icons[item.type];

  return (
    <Link href={`/anatomy/${item.slug}`} className="group block h-full">
      <Card className="h-full bg-white/70 p-0 transition duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-[0_18px_50px_rgba(69,58,45,0.10)]">
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-sage-50 text-sage-800">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <SourceBadge count={item.sourceIds.length} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-sage-200 bg-sage-50 text-sage-900"
            >
              {typeLabel[item.type]}
            </Badge>
            <Badge variant="outline" className="rounded-full bg-white/60">
              {item.category}
            </Badge>
          </div>
          <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{item.nameJa}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.nameEn}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary}</p>
          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
            <span className="line-clamp-1">{item.meaningForYogaTeachers[0]}</span>
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
