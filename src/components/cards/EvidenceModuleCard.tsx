import Link from "next/link";
import { ArrowRight, FileText, GraduationCap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SourceBadge } from "@/components/content/SourceBadge";
import type { SourceDigest } from "@/data/sourceDigests";

interface EvidenceModuleCardProps {
  digest: SourceDigest;
  sourceCount?: number;
}

export function EvidenceModuleCard({ digest, sourceCount = 1 }: EvidenceModuleCardProps) {
  return (
    <Link href={digest.routeHref} className="group block h-full">
      <Card className="h-full bg-white/78 p-0 transition duration-300 hover:-translate-y-0.5 hover:border-sage-200 hover:shadow-[0_16px_42px_rgba(69,58,45,0.10)]">
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-sage-900">
              <span className="flex size-9 items-center justify-center rounded-2xl bg-sage-50">
                <FileText className="size-4" aria-hidden="true" />
              </span>
              {digest.label}
            </div>
            <SourceBadge count={sourceCount} />
          </div>
          <div className="space-y-4">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-charcoal-900">
                <GraduationCap className="size-3.5 text-sage-700" aria-hidden="true" />
                公開情報で確認したこと
              </p>
              <p className="text-sm leading-7 text-muted-foreground">{digest.publicFinding}</p>
            </div>
            <div className="rounded-2xl bg-sand-50/80 p-4">
              <p className="mb-2 text-xs font-semibold text-sand-950">教材への落とし込み</p>
              <p className="text-sm leading-7 text-sand-950/78">{digest.platformUse}</p>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-end pt-5 text-xs font-medium text-sage-900">
            該当教材へ
            <ArrowRight
              className="ml-1 size-4 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
