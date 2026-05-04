"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickAnswerInlineProps {
  question: string;
  answer: string;
  className?: string;
}

export function QuickAnswerInline({ question, answer, className }: QuickAnswerInlineProps) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("rounded-2xl border border-border/70 bg-white/58 p-3", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-sage-800 uppercase">
            一問一答
          </p>
          <p className="mt-1 text-sm font-medium leading-6 text-charcoal-900">{question}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mt-0.5 size-8 shrink-0 rounded-full bg-white/70"
          aria-label={isOpen ? "答えを閉じる" : "答えを見る"}
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={() => setIsOpen((current) => !current)}
        >
          <ChevronDown
            className={cn("size-4 transition-transform", isOpen && "rotate-180")}
            aria-hidden="true"
          />
        </Button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.p
            id={answerId}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden pt-3 text-sm leading-7 text-muted-foreground"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
