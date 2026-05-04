import { ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const styles = {
  低: "border-sage-200 bg-sage-50 text-sage-900",
  中: "border-sand-300 bg-sand-100 text-sand-950",
  高: "border-terracotta-200 bg-terracotta-50 text-terracotta-950",
};

export function CautionBadge({ level }: { level: "低" | "中" | "高" }) {
  return (
    <Badge variant="outline" className={cn("gap-1 rounded-full", styles[level])}>
      <ShieldAlert className="size-3" aria-hidden="true" />
      配慮 {level}
    </Badge>
  );
}
