"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Eye, Home, PlayCircle, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/lessons", label: "学ぶ", icon: BookOpen },
  { href: "/practice", label: "演習", icon: PlayCircle },
  { href: "/anatomy", label: "図鑑", icon: Eye },
  { href: "/safety", label: "配慮", icon: ShieldCheck },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 rounded-3xl border border-border/70 bg-card/85 p-1.5 shadow-[0_18px_60px_rgba(45,41,36,0.18)] backdrop-blur-xl lg:hidden"
      aria-label="モバイルナビゲーション"
    >
      <div className="grid grid-cols-5 gap-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl text-[10.5px] font-medium text-muted-foreground transition",
                active && "bg-sage-50 text-sage-950"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "size-[18px] transition-transform",
                  active ? "text-sage-800 scale-110" : "group-active:scale-95"
                )}
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
