"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/content/TrustBadge";
import { BodyMapIllustration } from "@/components/visuals/BodyMapIllustration";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: "easeOut" as const },
      };

  return (
    <section className="grid min-h-[540px] items-center gap-10 py-7 lg:min-h-[560px] lg:grid-cols-[1.05fr_0.95fr] lg:py-6">
      <motion.div {...motionProps} className="max-w-3xl">
        <TrustBadge />
        <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl">
          Asana Anatomy Lab
        </h1>
        <p className="mt-5 text-2xl font-medium leading-snug tracking-[-0.01em] text-charcoal-800 sm:text-3xl">
          ポーズの形ではなく、身体の仕組みから学ぶ。
        </p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          Asana Anatomy
          Labは、ヨガ講師・講師養成中の学習者が、ポーズ・筋肉・関節・安全配慮を体系的に学ぶための解剖学プラットフォームです。信頼できる参照元をもとに、身体の構造を美しく、わかりやすく、教えられる知識へ変換します。
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/lessons">
            <Button className="h-12 rounded-full bg-charcoal-900 px-6 text-white hover:bg-charcoal-800">
              <BookOpen className="size-4" aria-hidden="true" />
              レッスンを見る
            </Button>
          </Link>
          <Link href="/safety">
            <Button
              variant="outline"
              className="h-12 rounded-full border-sage-200 bg-white/70 px-6"
            >
              <ShieldCheck className="size-4" aria-hidden="true" />
              安全配慮を確認
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        className="relative"
      >
        <div className="absolute -inset-5 rounded-[2.4rem] bg-white/45 blur-2xl" />
        <BodyMapIllustration
          highlights={["肩", "胸郭", "脊柱", "股関節"]}
          className="relative min-h-[420px]"
        />
        <div className="pointer-events-none absolute bottom-6 left-6 right-6 rounded-3xl border border-white/70 bg-white/78 p-4 shadow-sm backdrop-blur-xl">
          <p className="text-sm font-semibold text-charcoal-900">今日の観察テーマ</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            肩・胸郭・脊柱・股関節を分けて見て、ポーズ中の負担がどこへ集まりやすいかを観察します。
          </p>
        </div>
      </motion.div>
    </section>
  );
}
