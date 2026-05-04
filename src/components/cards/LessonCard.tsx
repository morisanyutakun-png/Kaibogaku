import Link from "next/link";
import { ArrowRight, Clock3, Layers3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SourceBadge } from "@/components/content/SourceBadge";
import type { Lesson } from "@/types/content";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link href={`/lessons/${lesson.slug}`} className="group block h-full">
      <Card className="h-full bg-white/70 p-0 transition duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-[0_18px_50px_rgba(69,58,45,0.10)]">
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-sage-200 bg-sage-50 text-sage-900"
            >
              {lesson.category}
            </Badge>
            <Badge variant="outline" className="rounded-full bg-white/70">
              {lesson.level}
            </Badge>
            <SourceBadge count={lesson.sourceIds.length} />
          </div>
          <h3 className="text-lg font-semibold tracking-[-0.01em]">{lesson.title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{lesson.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {lesson.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {lesson.estimatedMinutes}分
            </span>
            <span className="flex items-center gap-1.5">
              <Layers3 className="size-3.5" aria-hidden="true" />
              {lesson.bodyArea}
            </span>
            <ArrowRight
              className="size-4 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
