import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LearningPathCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone?: "sage" | "sand" | "terracotta";
  eyebrow?: string;
  reference?: string;
}

const tones = {
  sage: "from-sage-50 to-white text-sage-900 border-sage-200",
  sand: "from-sand-100 to-white text-sand-950 border-sand-200",
  terracotta: "from-terracotta-50 to-white text-terracotta-950 border-terracotta-200",
};

export function LearningPathCard({
  title,
  description,
  href,
  icon: Icon,
  tone = "sage",
  eyebrow,
  reference,
}: LearningPathCardProps) {
  return (
    <Link href={href} className="group block">
      <Card
        className={cn(
          "h-full border bg-white/75 p-0 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(69,58,45,0.10)]",
          tones[tone]
        )}
      >
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-6 flex items-center justify-between">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <ArrowRight
              className="size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground"
              aria-hidden="true"
            />
          </div>
          {eyebrow ? (
            <p className="mb-2 text-xs font-medium text-muted-foreground">{eyebrow}</p>
          ) : null}
          <h3 className="text-lg font-semibold tracking-[-0.01em]">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
          {reference ? (
            <p className="mt-4 rounded-2xl bg-white/70 p-3 text-xs leading-6 text-muted-foreground">
              参照: {reference}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}
