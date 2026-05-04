"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Three-item bottom bar — Hick's Law says fewer choices accelerate
 * decisions. The 56px touch target satisfies Fitts's Law and Apple HIG.
 * Anatomy and Safety are reachable inside Lessons (no need for primary
 * nav real estate on phone).
 */
const items = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/lessons", label: "学ぶ", icon: BookOpen },
  { href: "/practice", label: "演習", icon: PlayCircle },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 rounded-[1.75rem] border border-border/70 bg-card/85 p-1.5 shadow-[0_18px_60px_rgba(45,41,36,0.18)] backdrop-blur-xl lg:hidden"
      aria-label="モバイルナビゲーション"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-3 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-medium transition-[background-color,color,transform] active:scale-[0.97]",
                active
                  ? "bg-sage-900 text-card"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={cn("size-[20px] transition-transform")}
                aria-hidden="true"
                strokeWidth={active ? 2.4 : 2}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
