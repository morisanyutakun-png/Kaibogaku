import { AlertTriangle, ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Source } from "@/types/content";

const typeLabel: Record<Source["type"], string> = {
  official: "公式",
  textbook: "教科書",
  research: "研究",
  guideline: "基準",
};

export function SourceCard({ sources }: { sources: Source[] }) {
  if (!sources.length) {
    return (
      <Card className="border-terracotta-200 bg-terracotta-50/75">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-terracotta-950">
            <AlertTriangle className="size-4" aria-hidden="true" />
            出典未設定
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-terracotta-950/85">
          この教材にはsourceIdsが設定されていません。公開前に信頼できる参照元へ紐づけてください。
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/75">
      <CardHeader>
        <CardTitle>参考情報</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-border/70 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-sage-200 hover:shadow-sm"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold leading-snug">{source.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{source.organization}</p>
              </div>
              <ExternalLink
                className="size-4 shrink-0 text-muted-foreground transition group-hover:text-sage-700"
                aria-hidden="true"
              />
            </div>
            <p className="text-xs leading-6 text-muted-foreground">{source.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
              <span className="rounded-full bg-sage-50 px-2 py-1 text-sage-900">
                {typeLabel[source.type]}
              </span>
              <span className="rounded-full bg-muted px-2 py-1">
                reviewed {source.lastReviewedAt}
              </span>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
