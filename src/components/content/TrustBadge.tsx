import { BadgeCheck } from "lucide-react";

export function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-sage-950 shadow-sm">
      <BadgeCheck className="size-4 text-sage-700" aria-hidden="true" />
      参照元に紐づく教材データ
    </div>
  );
}
