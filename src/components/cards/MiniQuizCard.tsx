"use client";

import { useState } from "react";
import { CheckCircle2, Circle, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Quiz } from "@/types/content";
import { cn } from "@/lib/utils";
import { SourceBadge } from "@/components/content/SourceBadge";

export function MiniQuizCard({ quizzes }: { quizzes: Quiz[] }) {
  const [selected, setSelected] = useState<Record<number, number>>({});

  if (!quizzes.length) return null;

  return (
    <Card className="bg-white/75">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="size-4 text-sage-700" aria-hidden="true" />
          ミニクイズ
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        {quizzes.map((quiz, quizIndex) => {
          const selectedIndex = selected[quizIndex];
          const answered = selectedIndex !== undefined;

          return (
            <div
              key={quiz.question}
              className="rounded-3xl border border-border/70 bg-white/60 p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <p className="text-sm font-semibold leading-7">{quiz.question}</p>
                <SourceBadge count={quiz.sourceIds.length} />
              </div>
              <div className="grid gap-2">
                {quiz.choices.map((choice, choiceIndex) => {
                  const isCorrect = quiz.answerIndex === choiceIndex;
                  const isSelected = selectedIndex === choiceIndex;

                  return (
                    <Button
                      key={choice}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-auto justify-start whitespace-normal rounded-2xl bg-white/70 px-3 py-3 text-left font-normal leading-6",
                        answered && isCorrect && "border-sage-300 bg-sage-50 text-sage-950",
                        answered &&
                          isSelected &&
                          !isCorrect &&
                          "border-terracotta-200 bg-terracotta-50 text-terracotta-950"
                      )}
                      onClick={() =>
                        setSelected((current) => ({ ...current, [quizIndex]: choiceIndex }))
                      }
                    >
                      {answered && isCorrect ? (
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sage-700" />
                      ) : (
                        <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      )}
                      {choice}
                    </Button>
                  );
                })}
              </div>
              {answered ? (
                <p className="mt-3 rounded-2xl bg-muted/70 p-3 text-sm leading-7 text-muted-foreground">
                  {quiz.explanation}
                </p>
              ) : null}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
