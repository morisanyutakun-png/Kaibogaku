import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Layers,
  Shuffle,
  Target,
  Timer,
} from "lucide-react";

import { listAllPracticeQuestions } from "@/lib/quiz-bank";
import { contentRepository } from "@/lib/repositories";
import { toneFor } from "@/lib/utils";
import { PoseSilhouette, shapeForSlug } from "@/components/visuals/PoseSilhouette";

export const metadata: Metadata = {
  title: "演習ハブ｜解剖学 Lab",
  description: "ランダム1問、ポーズで集中、章ごとの一問一答 — 学習の目的に合わせて選ぶ演習ハブ。",
};

export default async function PracticeHubPage() {
  const all = listAllPracticeQuestions();
  const lessons = await contentRepository.getLessons();
  const poses = await contentRepository.getPoses();

  const totalQuestions = all.length;

  return (
    <div className="space-y-9 pb-20 pt-2">
      <header className="space-y-1.5 pt-1">
        <div className="kicker">Practice</div>
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">
          演習ハブ
        </h1>
        <p className="max-w-[54ch] text-[13.5px] leading-relaxed text-muted-foreground text-pretty">
          時間で選ぶか、テーマで選ぶか。今のあなたの動機にいちばん近い入口から始めてください。
          ぜんぶで <span className="num font-semibold text-foreground">{totalQuestions}</span> 問。
        </p>
      </header>

      {/* Quick start tiles */}
      <section className="space-y-3">
        <div className="px-1">
          <h2 className="text-[17px] font-semibold tracking-tight sm:text-[19px]">
            すぐ始める
          </h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            今ある時間に合わせて
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <QuickTile
            href="/practice/random"
            gradient="bg-grad-sage"
            icon={Shuffle}
            kicker="3分"
            title="サクッと1問"
            sub="ランダムから抽選"
          />
          <QuickTile
            href="/practice/focus"
            gradient="bg-grad-terracotta"
            icon={Target}
            kicker="10分"
            title="ポーズで集中"
            sub="部位別 5問セット"
          />
          <QuickTile
            href="/practice/exam"
            gradient="bg-grad-dusk"
            icon={Timer}
            kicker="20分"
            title="復習セッション"
            sub="全範囲から10問"
          />
        </div>
      </section>

      {/* By chapter */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3 px-1">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight sm:text-[19px]">
              章ごとに解く
            </h2>
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              レッスンに紐づいた一問一答
            </p>
          </div>
          <Link
            href="/lessons"
            className="inline-flex items-center gap-0.5 text-[12px] font-medium text-muted-foreground hover:text-foreground"
          >
            学習目次へ
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {lessons
            .filter((l) => l.quiz.length > 0)
            .map((lesson) => {
              const tone = toneFor(lesson.category);
              return (
                <Link
                  key={lesson.id}
                  href={`/practice/lesson/${lesson.slug}`}
                  className="surface-card group flex items-stretch gap-3.5 overflow-hidden p-0"
                >
                  <div className={`relative w-24 shrink-0 overflow-hidden ${tone.gradient}`}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
                      }}
                    />
                    <PoseSilhouette
                      shape={shapeForSlug("mountain-pose")}
                      className="relative z-10"
                      ariaLabel=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 py-4 pr-4">
                    <div
                      className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: tone.hue }}
                    >
                      {lesson.category}
                    </div>
                    <div className="mt-1 line-clamp-1 text-[14.5px] font-semibold leading-tight">
                      {lesson.title}
                    </div>
                    <div className="mt-1 line-clamp-1 text-[11.5px] text-muted-foreground">
                      {lesson.subtitle}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-foreground">
                      <Layers className="h-3 w-3 text-muted-foreground" />
                      <span className="num">{lesson.quiz.length}</span> 問
                      <ArrowRight className="ml-1 h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      {/* By pose */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3 px-1">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight sm:text-[19px]">
              ポーズから解く
            </h2>
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              アサナの観察ポイントから入る
            </p>
          </div>
          <Link
            href="/poses"
            className="inline-flex items-center gap-0.5 text-[12px] font-medium text-muted-foreground hover:text-foreground"
          >
            ポーズ一覧へ
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {poses
            .filter((p) => p.quiz.length > 0)
            .slice(0, 6)
            .map((pose) => {
              const tone = toneFor("ポーズ");
              return (
                <Link
                  key={pose.id}
                  href={`/practice/pose/${pose.slug}`}
                  className="surface-card group flex h-full flex-col overflow-hidden p-0"
                >
                  <div className={`relative aspect-[5/4] w-full overflow-hidden ${tone.gradient}`}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
                      }}
                    />
                    <PoseSilhouette shape={shapeForSlug(pose.slug)} className="relative z-10" />
                    <span className="glass-chip absolute left-3 top-3 z-20">
                      {pose.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-4">
                    <div className="text-[14.5px] font-semibold leading-tight tracking-tight">
                      {pose.nameJa}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{pose.nameEn}</div>
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-foreground">
                      <Layers className="h-3 w-3 text-muted-foreground" />
                      <span className="num">{pose.quiz.length}</span> 問
                      <ArrowRight className="ml-1 h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}

function QuickTile({
  href,
  gradient,
  icon: Icon,
  kicker,
  title,
  sub,
}: {
  href: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className={`relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-3xl ${gradient} p-4 text-card transition-transform hover:-translate-y-[2px] active:scale-[0.97]`}
      style={{
        boxShadow:
          "0 22px 48px rgba(45, 41, 36, 0.18), 0 6px 14px rgba(45, 41, 36, 0.08)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.24), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.20), transparent 55%)",
        }}
      />
      <div className="relative z-10 flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card/15 ring-1 ring-inset ring-card/25 backdrop-blur">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <span className="rounded-full bg-card/15 px-2 py-0.5 text-[10.5px] font-semibold backdrop-blur">
          {kicker}
        </span>
      </div>
      <div className="relative z-10">
        <div className="text-[16px] font-semibold leading-tight tracking-tight">
          {title}
        </div>
        <div className="text-[11.5px] opacity-85">{sub}</div>
      </div>
    </Link>
  );
}
