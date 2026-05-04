import { AlertTriangle, BookMarked, GraduationCap, SearchCheck, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SourceBadge } from "@/components/content/SourceBadge";
import type { ContentSection } from "@/types/content";

const icons = {
  anatomy: BookMarked,
  teaching: GraduationCap,
  observation: SearchCheck,
  safety: ShieldCheck,
};

const labels = {
  anatomy: "解剖学的説明",
  teaching: "ヨガ指導上の解釈",
  observation: "観察ポイント",
  safety: "安全配慮",
};

export function ReferencedSectionCard({ section }: { section: ContentSection }) {
  const Icon = icons[section.kind];

  if (!section.sourceIds.length) {
    return (
      <Card className="border-terracotta-200 bg-terracotta-50/75">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-terracotta-950">
            <AlertTriangle className="size-4" aria-hidden="true" />
            {section.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-terracotta-950/85">
          出典未設定のため、この本文は公開表示を控えています。
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/75">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-900">
            <Icon className="size-3.5" aria-hidden="true" />
            {labels[section.kind]}
          </span>
          <SourceBadge count={section.sourceIds.length} />
        </div>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-8 text-muted-foreground">
        {section.gentleExplanation ? (
          <p className="rounded-2xl bg-sand-50 p-4 text-sand-950/85">{section.gentleExplanation}</p>
        ) : null}
        {section.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </CardContent>
    </Card>
  );
}
