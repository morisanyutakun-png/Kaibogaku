"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import type { PracticeQuestion } from "@/lib/quiz-bank";
import { cn, toneFor } from "@/lib/utils";

type Outcome = "correct" | "incorrect";

type Attempt = {
  questionId: string;
  selectedIndex: number;
  outcome: Outcome;
  durationMs: number;
};

export function QuizPlayer({
  questions,
  title,
  kicker,
  exitHref,
}: {
  questions: PracticeQuestion[];
  title: string;
  kicker: string;
  exitHref?: string;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  const total = questions.length;
  const current = questions[index];
  const completed = index >= total;

  const summary = useMemo(() => {
    const correct = attempts.filter((a) => a.outcome === "correct").length;
    const incorrect = attempts.length - correct;
    const accuracy = attempts.length > 0 ? Math.round((correct / attempts.length) * 100) : 0;
    return { correct, incorrect, accuracy, total: attempts.length };
  }, [attempts]);

  if (completed) {
    return (
      <SummaryScreen
        attempts={attempts}
        questions={questions}
        title={title}
        accuracy={summary.accuracy}
        correct={summary.correct}
        incorrect={summary.incorrect}
        onRestart={() => {
          setIndex(0);
          setAttempts([]);
          setSelected(null);
          setRevealed(false);
          setStartedAt(Date.now());
        }}
        exitHref={exitHref}
      />
    );
  }

  const tone = toneFor(current.category);
  const onSubmit = () => {
    if (selected === null) return;
    const isCorrect = selected === current.quiz.answerIndex;
    setAttempts((prev) => [
      ...prev,
      {
        questionId: current.id,
        selectedIndex: selected,
        outcome: isCorrect ? "correct" : "incorrect",
        durationMs: Date.now() - startedAt,
      },
    ]);
    setRevealed(true);
  };
  const onNext = () => {
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
    setStartedAt(Date.now());
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header / progress */}
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="kicker">{kicker}</div>
          <h1 className="mt-1 text-[22px] font-semibold leading-tight tracking-tight sm:text-[26px]">
            {title}
          </h1>
        </div>
        <div className="shrink-0 rounded-2xl bg-card px-3.5 py-2 ring-1 ring-charcoal-900/[0.05] shadow-sm">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            進行
          </div>
          <div className="num mt-0.5 text-[18px] font-semibold leading-none tracking-tight">
            {index + 1}
            <span className="ml-0.5 text-[11px] text-muted-foreground">/ {total}</span>
          </div>
        </div>
      </div>

      <ProgressBar
        completed={index}
        total={total}
        outcomes={attempts.map((a) => a.outcome)}
        active
      />

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.article
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card relative overflow-hidden p-6 sm:p-7"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full opacity-[0.18] blur-3xl"
            style={{ background: tone.hue }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: tone.hue }}
              >
                {tone.label}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{ background: tone.hueDim, color: tone.hue }}
              >
                {current.sourceTitle}
              </span>
              {current.bodyArea && (
                <span className="text-[11px] text-muted-foreground">
                  · {current.bodyArea}
                </span>
              )}
            </div>
            <h2 className="mt-3 text-[20px] font-semibold leading-snug tracking-tight text-balance sm:text-[22px]">
              {current.quiz.question}
            </h2>
          </div>
        </motion.article>
      </AnimatePresence>

      {/* Choices */}
      <ChoiceList
        choices={current.quiz.choices}
        answerIndex={current.quiz.answerIndex}
        selected={selected}
        revealed={revealed}
        onSelect={(i) => !revealed && setSelected(i)}
      />

      {/* Submit / Next */}
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="submit"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="sticky bottom-[calc(env(safe-area-inset-bottom)+72px)] z-10 lg:static"
          >
            <button
              type="button"
              disabled={selected === null}
              onClick={onSubmit}
              className="pill-sage h-12 w-full px-5 text-[15px] disabled:opacity-50"
            >
              答え合わせ
            </button>
          </motion.div>
        ) : (
          <ResultPanel
            outcome={selected === current.quiz.answerIndex ? "correct" : "incorrect"}
            explanation={current.quiz.explanation}
            sourceTitle={current.sourceTitle}
            sourceHref={
              current.source === "lesson"
                ? `/lessons/${current.sourceSlug}`
                : `/poses/${current.sourceSlug}`
            }
            isLast={index + 1 >= total}
            onNext={onNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProgressBar({
  completed,
  total,
  outcomes,
  active,
}: {
  completed: number;
  total: number;
  outcomes: Outcome[];
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const outcome = outcomes[i];
        const isCurrent = active && i === completed;
        return (
          <span
            key={i}
            className={cn(
              "h-[5px] flex-1 rounded-full transition-all duration-300",
              outcome === "correct"
                ? "bg-sage-500"
                : outcome === "incorrect"
                  ? "bg-clay-500"
                  : isCurrent
                    ? "bg-charcoal-900/60"
                    : "bg-border"
            )}
          />
        );
      })}
    </div>
  );
}

function ChoiceList({
  choices,
  answerIndex,
  selected,
  revealed,
  onSelect,
}: {
  choices: string[];
  answerIndex: number;
  selected: number | null;
  revealed: boolean;
  onSelect: (i: number) => void;
}) {
  const labels = ["A", "B", "C", "D", "E"];
  return (
    <div className="space-y-2.5">
      {choices.map((choice, i) => {
        const isSelected = selected === i;
        const isCorrect = revealed && i === answerIndex;
        const isWrong = revealed && isSelected && i !== answerIndex;
        const dimmed = revealed && i !== answerIndex && !isSelected;
        return (
          <motion.button
            key={i}
            type="button"
            disabled={revealed}
            onClick={() => onSelect(i)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: dimmed ? 0.45 : 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileTap={!revealed ? { scale: 0.985 } : undefined}
            className={cn(
              "group relative flex w-full items-center gap-3.5 rounded-2xl bg-card p-4 text-left ring-1 ring-charcoal-900/[0.05] shadow-[0_1px_2px_rgba(45,41,36,0.04)] transition-[background-color,box-shadow,ring,transform]",
              !revealed && !isSelected && "hover:bg-muted/40 active:bg-muted/70 hover:-translate-y-[1px]",
              !revealed && isSelected && "ring-2 ring-sage-500 bg-sage-50/60",
              isCorrect && "ring-2 ring-sage-500 bg-sage-50/70",
              isWrong && "ring-2 ring-clay-500 bg-terracotta-50/70"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold transition-colors",
                !revealed && !isSelected && "bg-muted text-foreground",
                !revealed && isSelected && "bg-sage-900 text-card",
                isCorrect && "bg-sage-700 text-card",
                isWrong && "bg-clay-700 text-card",
                dimmed && "bg-muted text-muted-foreground"
              )}
            >
              {labels[i] ?? i + 1}
            </span>
            <span className="flex-1 text-[15px] leading-relaxed text-foreground">
              {choice}
            </span>
            {isCorrect && (
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-700 text-card shadow-[0_8px_22px_rgba(86,111,81,0.32)]"
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </motion.span>
            )}
            {isWrong && (
              <motion.span
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay-700 text-card shadow-[0_8px_22px_rgba(138,79,55,0.32)]"
              >
                <X className="h-4 w-4" strokeWidth={3} />
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function ResultPanel({
  outcome,
  explanation,
  sourceTitle,
  sourceHref,
  isLast,
  onNext,
}: {
  outcome: Outcome;
  explanation: string;
  sourceTitle: string;
  sourceHref: string;
  isLast: boolean;
  onNext: () => void;
}) {
  const correct = outcome === "correct";
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className={cn(
          "relative overflow-hidden rounded-3xl p-4 shadow-[0_2px_8px_rgba(45,41,36,0.06)] ring-1",
          correct
            ? "bg-gradient-to-br from-sage-50 via-card to-card ring-sage-200"
            : "bg-gradient-to-br from-terracotta-50 via-card to-card ring-terracotta-200"
        )}
      >
        <div className="flex items-center gap-3.5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.06 }}
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-card",
              correct
                ? "bg-sage-700 shadow-[0_10px_26px_rgba(86,111,81,0.34)]"
                : "bg-clay-700 shadow-[0_10px_26px_rgba(138,79,55,0.34)]"
            )}
          >
            {correct ? (
              <Check className="h-6 w-6" strokeWidth={3} />
            ) : (
              <X className="h-6 w-6" strokeWidth={3} />
            )}
          </motion.div>
          <div className="min-w-0">
            <div className="text-[18px] font-semibold tracking-tight">
              {correct ? "正解です" : "もう一度ここを見ておきましょう"}
            </div>
            <div className="text-[12.5px] text-muted-foreground">
              {correct
                ? "言葉がけと観察ポイントが結びついた瞬間です。"
                : "誤答こそ気づきの入口。下の解説で輪郭を整えます。"}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="surface-card p-5"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage-700 text-card">
            <Lightbulb className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-sage-800">
            解説
          </div>
        </div>
        <p className="mt-2 text-[14.5px] leading-[1.85] text-foreground/90">
          {explanation}
        </p>
        <Link
          href={sourceHref}
          className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-sage-800 hover:text-sage-900"
        >
          <BookOpenCheck className="h-3.5 w-3.5" />
          出典 ·「{sourceTitle}」を読む
          <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>

      <motion.button
        type="button"
        onClick={onNext}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pill-sage h-12 w-full px-5 text-[15px]"
      >
        {isLast ? "結果を見る" : "次の問題へ"}
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}

function SummaryScreen({
  attempts,
  questions,
  title,
  accuracy,
  correct,
  incorrect,
  onRestart,
  exitHref,
}: {
  attempts: Attempt[];
  questions: PracticeQuestion[];
  title: string;
  accuracy: number;
  correct: number;
  incorrect: number;
  onRestart: () => void;
  exitHref?: string;
}) {
  const grade = accuracy >= 90 ? "素晴らしい流れ" : accuracy >= 60 ? "あと一歩" : "確認の機会";
  const totalSec = Math.round(
    attempts.reduce((acc, a) => acc + a.durationMs, 0) / 1000
  );
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  return (
    <div className="space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-tile bg-grad-forest"
      >
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="kicker text-card/80 before:bg-card/80">セッション完了</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-card sm:text-[28px]">
              {title}
            </h2>
            <p className="mt-2 max-w-[44ch] text-[13.5px] leading-relaxed text-card/90">
              {grade}。記録した {attempts.length} 問のうち、正答 {correct} / 誤答 {incorrect}。
            </p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.18 }}
            className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-card/15 ring-1 ring-card/30 backdrop-blur"
          >
            <div className="text-center text-card">
              <div className="num text-[34px] font-semibold leading-none tracking-tight">
                {accuracy}
                <span className="text-[14px] font-medium opacity-80">%</span>
              </div>
              <div className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] opacity-80">
                Accuracy
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="正答" value={correct} accent="sage" icon={Check} />
        <Stat label="誤答" value={incorrect} accent="clay" icon={X} />
        <Stat
          label="所要時間"
          value={`${minutes}:${String(seconds).padStart(2, "0")}`}
          accent="ink"
          icon={Sparkles}
        />
      </div>

      <section className="surface-card p-5">
        <div className="flex items-center justify-between">
          <div className="section-title">問題ごとの結果</div>
          <span className="text-[11px] text-muted-foreground">{attempts.length} 問</span>
        </div>
        <ul className="mt-3 divide-y divide-border/60">
          {attempts.map((a, i) => {
            const q = questions[i];
            const correctRow = a.outcome === "correct";
            return (
              <li key={a.questionId} className="flex items-start gap-3 py-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-card",
                    correctRow ? "bg-sage-700" : "bg-clay-700"
                  )}
                >
                  {correctRow ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-medium leading-snug">
                    {q.quiz.question}
                  </div>
                  <Link
                    href={
                      q.source === "lesson"
                        ? `/lessons/${q.sourceSlug}`
                        : `/poses/${q.sourceSlug}`
                    }
                    className="mt-1 inline-flex items-center gap-1 text-[11.5px] text-muted-foreground hover:text-foreground"
                  >
                    {q.sourceTitle}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={onRestart} className="pill-ghost h-12 px-5 text-[15px]">
          <RotateCcw className="h-4 w-4" />
          もう一度
        </button>
        <Link href={exitHref ?? "/practice"} className="pill-sage h-12 px-5 text-[15px]">
          <Trophy className="h-4 w-4" />
          学習ハブへ戻る
        </Link>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  accent: "sage" | "clay" | "ink";
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  const accentClass =
    accent === "sage"
      ? "bg-grad-sage"
      : accent === "clay"
        ? "bg-grad-terracotta"
        : "bg-grad-ink";
  return (
    <div className="surface-card flex items-center gap-3 p-4">
      <span className={cn("tile-icon-sm", accentClass)}>
        <Icon className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </div>
        <div className="num text-[18px] font-semibold leading-tight tracking-tight">
          {value}
        </div>
      </div>
    </div>
  );
}
