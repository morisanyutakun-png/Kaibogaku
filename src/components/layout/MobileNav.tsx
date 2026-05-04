"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, HeartPulse, ListChecks } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "ToC", icon: ListChecks },
  { href: "/lessons", label: "Lessons", icon: BookOpen },
  { href: "/safety", label: "Safety", icon: HeartPulse },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 rounded-3xl border border-border/80 bg-white/85 p-2 shadow-[0_18px_60px_rgba(69,58,45,0.16)] backdrop-blur-xl lg:hidden"
      aria-label="モバイルナビゲーション"
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
                "flex min-h-12 flex-col items-center justify-center rounded-2xl text-[11px] text-muted-foreground transition",
                active && "bg-sage-100 text-sage-950"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="mb-1 size-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
