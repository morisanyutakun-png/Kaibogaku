import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * "今日のミッション" — three small steps that make a complete day. Currently
 * defaulted to "not done" (we have no auth yet); when Neon comes online we
 * read attempt history and flip the rows automatically.
 */
type MissionState = {
  read: boolean;
  solve: boolean;
  observe: boolean;
};

const DEFAULT_STATE: MissionState = { read: false, solve: false, observe: false };

export function MissionTracker({ state = DEFAULT_STATE }: { state?: MissionState }) {
  const completed = Object.values(state).filter(Boolean).length;
  return (
    <section className="space-y-3">
      <div className="px-1">
        <h2 className="text-[17px] font-semibold tracking-tight sm:text-[19px]">
          今日のミッション
        </h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          3つそろえると、その日は十分です
        </p>
      </div>
      <div className="surface-card p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[12px] text-muted-foreground">完了</div>
            <div className="num mt-0.5 text-[24px] font-semibold leading-none tracking-tight">
              {completed}
              <span className="ml-1 text-[12px] text-muted-foreground">/ 3</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Today
            </div>
            <div className="text-[12px] font-medium text-foreground">学習体験ベータ</div>
          </div>
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          <Row done={state.read} label="読む" sub="章を1つ" href="/lessons" />
          <Row done={state.solve} label="解く" sub="1問でもOK" href="/practice/random" />
          <Row done={state.observe} label="観察" sub="図鑑モードで散策" href="/anatomy" />
        </div>
      </div>
    </section>
  );
}

function Row({
  done,
  label,
  sub,
  href,
}: {
  done: boolean;
  label: string;
  sub: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-2xl p-3.5 transition-transform duration-150 active:scale-[0.99]",
        done
          ? "bg-sage-50 ring-1 ring-sage-200"
          : "bg-muted/40 ring-1 ring-charcoal-900/[0.04] hover:bg-muted/60"
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold",
          done ? "bg-sage-700 text-card" : "bg-card text-muted-foreground ring-1 ring-border"
        )}
      >
        {done ? "✓" : "·"}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[13.5px] font-semibold leading-tight">{label}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
