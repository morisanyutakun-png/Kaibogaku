import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { PoseExplorer } from "@/components/filters/PoseExplorer";
import { contentRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "ポーズ解剖一覧",
  description: "ヨガポーズを関節、筋肉、講師の観察、安全配慮から学ぶポーズ解剖一覧。",
};

export default async function PosesPage() {
  const poses = await contentRepository.getPoses();
  const totalQuiz = poses.reduce((s, p) => s + p.quiz.length, 0);

  return (
    <div className="space-y-9 pb-20 pt-2">
      <header className="space-y-1.5 pt-1">
        <div className="kicker">Pose Anatomy</div>
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">
          ポーズ別に学ぶ
        </h1>
        <p className="max-w-[58ch] text-[13.5px] leading-relaxed text-muted-foreground text-pretty">
          完成形ではなく、主な関節運動・関わる筋肉・負担が出やすいパターン・修正候補として読み解きます。
        </p>
      </header>

      <section className="surface-card flex items-stretch gap-4 overflow-hidden p-0">
        <div className="bg-grad-terracotta relative w-28 shrink-0 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.18), transparent 55%)",
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <Compass className="h-9 w-9 text-card" strokeWidth={1.6} />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-4 py-4 pr-5">
          <div className="min-w-0 flex-1">
            <div className="text-[14.5px] font-semibold leading-tight tracking-tight">
              ポーズで集中演習
            </div>
            <div className="mt-1 text-[12px] text-muted-foreground">
              <span className="num">{totalQuiz}</span> 問の一問一答が、ポーズに紐づきます
            </div>
          </div>
          <Link href="/practice/focus" className="pill-terracotta h-10 px-4 text-[13px]">
            5問はじめる
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <PoseExplorer poses={poses} />
    </div>
  );
}
