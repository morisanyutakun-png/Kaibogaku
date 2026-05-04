import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SourceBadgeProps {
  count: number;
  className?: string;
}

export function SourceBadge({ count, className }: SourceBadgeProps) {
  const hasSources = count > 0;

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 rounded-full border-sage-200 bg-sage-50 text-sage-900",
        !hasSources && "border-terracotta-200 bg-terracotta-50 text-terracotta-900",
        className
      )}
    >
      {hasSources ? (
        <CheckCircle2 className="size-3" aria-hidden="true" />
      ) : (
        <AlertTriangle className="size-3" aria-hidden="true" />
      )}
      {hasSources ? `出典 ${count}` : "出典未設定"}
    </Badge>
  );
}
