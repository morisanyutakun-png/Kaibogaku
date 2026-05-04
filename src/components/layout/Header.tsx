"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  HeartPulse,
  ListChecks,
  Menu,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/lessons", label: "学ぶ" },
  { href: "/practice", label: "演習" },
  { href: "/anatomy", label: "解剖図鑑" },
  { href: "/safety", label: "配慮" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass-bar">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="解剖学 ホーム">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-grad-forest text-card shadow-[0_8px_18px_rgba(49,68,47,0.32)]">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-[14px] font-semibold tracking-[0.02em] text-foreground">
              解剖学 Lab
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              ヨガ講師のための学習プラットフォーム
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/65 p-1 shadow-sm lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-pill"
              data-active={isActive(pathname, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/practice/random" className="pill-sage h-9 px-4 text-[13px]">
            <PlayCircle className="size-4" />
            1問だけ
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full bg-card/70 lg:hidden">
              <Menu className="size-4" aria-hidden="true" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95">
            <SheetHeader>
              <SheetTitle>解剖学 Lab</SheetTitle>
            </SheetHeader>
            <div className="mt-6 grid gap-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted",
                    isActive(pathname, item.href) && "bg-sage-50 text-sage-950"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 text-center text-[11px] text-muted-foreground">
              <div className="rounded-2xl bg-card/70 p-3">
                <ListChecks className="mx-auto mb-2 size-4 text-sage-700" aria-hidden="true" />
                目次
              </div>
              <div className="rounded-2xl bg-card/70 p-3">
                <BookOpen className="mx-auto mb-2 size-4 text-sage-700" aria-hidden="true" />
                学ぶ
              </div>
              <div className="rounded-2xl bg-card/70 p-3">
                <HeartPulse className="mx-auto mb-2 size-4 text-clay-700" aria-hidden="true" />
                配慮
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
