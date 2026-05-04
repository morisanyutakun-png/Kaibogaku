"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Eye, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickAnswerCardProps {
  question: string;
  answer: string;
  sourceCount: number;
  className?: string;
  label?: string;
}

export function QuickAnswerCard({
  question,
  answer,
  sourceCount,
  className,
  label = "一問一答",
}: QuickAnswerCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <Card className={cn("border-sage-200/70 bg-white/78 shadow-sm", className)}>
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-sage-800 uppercase">{label}</p>
          <span className="rounded-full border border-sage-200 bg-sage-50 px-2.5 py-1 text-xs text-sage-900">
            出典 {sourceCount}
          </span>
        </div>
        <CardTitle className="text-xl leading-snug tracking-[-0.02em]">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          type="button"
          variant={isOpen ? "secondary" : "outline"}
          className={cn(
            "w-full rounded-full bg-white/75",
            isOpen && "bg-sage-100 text-sage-950 hover:bg-sage-100"
          )}
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? (
            <RotateCcw className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
          {isOpen ? "もう一度考える" : "答えを見る"}
        </Button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={answerId}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-4 rounded-2xl border border-sage-200/80 bg-sage-50/75 p-4"
            >
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-sage-950">
                <CheckCircle2 className="size-4 text-sage-700" aria-hidden="true" />
                短い答え
              </div>
              <p className="text-sm leading-7 text-sage-950/85">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
