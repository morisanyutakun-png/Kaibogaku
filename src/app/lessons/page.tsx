import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ListChecks } from "lucide-react";

import { LessonExplorer } from "@/components/filters/LessonExplorer";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "学ぶ｜レッスン一覧",
  description: "基礎解剖学、関節、筋肉、ポーズ、安全配慮を学ぶヨガ講師向けレッスン一覧。",
};

export default async function LessonsPage() {
  const [lessons, tocEntries] = await Promise.all([
    contentRepository.getLessons(),
    contentRepository.getStudyTocEntries(),
  ]);

  const totalMinutes = lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);
  const totalQuizzes = lessons.reduce((sum, l) => sum + l.quiz.length, 0);

  return (
    <div className="space-y-9 pb-20 pt-2">
      <header className="space-y-1.5 pt-1">
        <div className="kicker">Lessons</div>
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">
          学ぶ
        </h1>
        <p className="max-w-[58ch] text-[13.5px] leading-relaxed text-muted-foreground text-pretty">
          解剖学の基礎、関節と筋肉、ポーズへの応用、安全配慮を、出典に紐づく短い教材として整理しています。
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <StatTile label="章数" value={lessons.length} sub="基礎〜応用まで" gradient="bg-grad-forest" />
        <StatTile
          label="読了目安"
          value={`${totalMinutes}分`}
          sub="1日10分なら2週間"
          gradient="bg-grad-clay"
        />
        <StatTile
          label="一問一答"
          value={totalQuizzes}
          sub="演習で体感を確かめる"
          gradient="bg-grad-terracotta"
        />
      </section>

      <section className="surface-card flex items-stretch gap-4 overflow-hidden p-0">
        <div className="bg-grad-sage relative w-28 shrink-0 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <ListChecks className="h-9 w-9 text-card" strokeWidth={1.6} />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-4 py-4 pr-5">
          <div className="min-w-0 flex-1">
            <div className="text-[14.5px] font-semibold leading-tight tracking-tight">
              何から読むか迷ったら、ToC順に
            </div>
            <div className="mt-1 text-[12px] text-muted-foreground">
              <span className="num">{tocEntries.length}</span> 章 · 約{" "}
              <span className="num">
                {tocEntries.reduce((s, e) => s + e.estimatedMinutes, 0)}
              </span>{" "}
              分
            </div>
          </div>
          <Link href="/" className="pill-sage h-10 px-4 text-[13px]">
            <BookOpen className="h-3.5 w-3.5" />
            ToCへ
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <LessonExplorer lessons={lessons} />
    </div>
  );
}

function StatTile({
  label,
  value,
  sub,
  gradient,
}: {
  label: string;
  value: number | string;
  sub: string;
  gradient: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${gradient} p-5 text-card`}
      style={{ boxShadow: "0 18px 36px rgba(45,41,36,0.16)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
        }}
      />
      <div className="relative">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] opacity-80">
          {label}
        </div>
        <div className="num mt-1 text-[28px] font-semibold leading-none tracking-tight">
          {value}
        </div>
        <div className="mt-2 text-[11.5px] opacity-85">{sub}</div>
      </div>
    </div>
  );
}
