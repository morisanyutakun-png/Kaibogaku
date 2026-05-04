import Link from "next/link";
import { ArrowRight, Clock3, Layers3, PlayCircle } from "lucide-react";

import { PoseSilhouette, shapeForSlug } from "@/components/visuals/PoseSilhouette";
import { imageFor } from "@/data/imagery";
import { cn, toneFor } from "@/lib/utils";
import type { Lesson } from "@/types/content";

const SHAPE_BY_CATEGORY: Record<string, string> = {
  基礎解剖学: "mountain-pose",
  関節: "tree-pose",
  筋肉: "warrior-ii",
  ポーズ: "downward-facing-dog",
  安全配慮: "childs-pose",
};

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const tone = toneFor(lesson.category);
  const shape = SHAPE_BY_CATEGORY[lesson.category] ?? "default";
  const photo = imageFor(lesson.slug, "chapters");
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="surface-card group flex h-full flex-col overflow-hidden p-0"
    >
      <div className={cn("relative aspect-[16/10] w-full overflow-hidden", tone.gradient)}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
          }}
        />
        <PoseSilhouette
          shape={shapeForSlug(shape)}
          className="relative z-10"
          ariaLabel={lesson.title}
          imageSrc={photo}
        />
        <span className="glass-chip absolute left-3 top-3 z-20">
          {tone.label} · {lesson.level}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[16px] font-semibold leading-snug tracking-tight">
          {lesson.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-muted-foreground">
          {lesson.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {lesson.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 text-[11.5px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5" aria-hidden="true" />
            <span className="num font-semibold text-foreground">{lesson.estimatedMinutes}</span>分
          </span>
          <span className="flex items-center gap-1.5">
            <Layers3 className="size-3.5" aria-hidden="true" />
            {lesson.bodyArea}
          </span>
          <span className="flex items-center gap-1 text-sage-800">
            <PlayCircle className="size-3.5" />
            {lesson.quiz.length}問
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
