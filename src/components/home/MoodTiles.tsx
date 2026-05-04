import Link from "next/link";
import { Eye, Shuffle, Target, Timer, type LucideIcon } from "lucide-react";

/**
 * "気分で選ぶ" — three big, opinionated entry points. Each tile is sized for
 * a single tap and styled like an album cover so the row feels editorial,
 * not menu-like.
 */
type Mood = {
  href: string;
  gradient: string;
  icon: LucideIcon;
  kicker: string;
  title: string;
  sub: string;
};

const MOODS: Mood[] = [
  {
    href: "/practice/random",
    gradient: "bg-grad-sage",
    icon: Shuffle,
    kicker: "5分",
    title: "サクッと1問",
    sub: "通勤・隙間時間に",
  },
  {
    href: "/practice/focus",
    gradient: "bg-grad-terracotta",
    icon: Target,
    kicker: "15分",
    title: "ポーズで集中",
    sub: "苦手な部位を5問",
  },
  {
    href: "/anatomy",
    gradient: "bg-grad-river",
    icon: Eye,
    kicker: "観察",
    title: "解剖を見る",
    sub: "図鑑モードで散策",
  },
];

export function MoodTiles() {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3 px-1">
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold tracking-tight sm:text-[19px]">
            気分で選ぶ
          </h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            今日の身体と時間に合わせて
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {MOODS.map((mood) => (
          <Link
            key={mood.href}
            href={mood.href}
            className={`relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-3xl ${mood.gradient} p-4 text-card transition-transform duration-200 active:scale-[0.97] hover:-translate-y-[2px]`}
            style={{
              boxShadow:
                "0 22px 48px rgba(45, 41, 36, 0.18), 0 6px 14px rgba(45, 41, 36, 0.08)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.24), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(0,0,0,0.20), transparent 55%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.13 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />
            <div className="relative z-10 flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card/15 ring-1 ring-inset ring-card/25 backdrop-blur">
                <mood.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="rounded-full bg-card/15 px-2 py-0.5 text-[10.5px] font-semibold backdrop-blur">
                {mood.kicker}
              </span>
            </div>
            <div className="relative z-10">
              <div className="text-[16px] font-semibold leading-tight tracking-tight">
                {mood.title}
              </div>
              <div className="text-[11.5px] opacity-85">{mood.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
