"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, HeartPulse, ListChecks, Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "ToC" },
  { href: "/lessons", label: "Lessons" },
  { href: "/safety", label: "Safety" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Asana Anatomy Lab ホーム">
          <span className="flex size-9 items-center justify-center rounded-xl border border-sage-200 bg-sage-100 text-sage-900 shadow-sm">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.04em] text-foreground">
              Asana Anatomy Lab
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              ヨガ講師のための解剖学
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-white/55 p-1 shadow-sm lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-white hover:text-foreground",
                isActive(pathname, item.href) && "bg-white text-foreground shadow-sm"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/#toc">
            <Button variant="outline" className="rounded-full border-sage-200 bg-white/70">
              <ListChecks className="size-4" aria-hidden="true" />
              ToCを見る
            </Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full bg-white/70 lg:hidden">
              <Menu className="size-4" aria-hidden="true" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95">
            <SheetHeader>
              <SheetTitle>Asana Anatomy Lab</SheetTitle>
            </SheetHeader>
            <div className="mt-6 grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted",
                    isActive(pathname, item.href) && "bg-sage-100 text-sage-950"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
              <div className="rounded-2xl bg-white/60 p-3">
                <ListChecks className="mx-auto mb-2 size-4 text-sage-700" aria-hidden="true" />
                目次
              </div>
              <div className="rounded-2xl bg-white/60 p-3">
                <BookOpen className="mx-auto mb-2 size-4 text-sage-700" aria-hidden="true" />
                一問
              </div>
              <div className="rounded-2xl bg-white/60 p-3">
                <HeartPulse className="mx-auto mb-2 size-4 text-sage-700" aria-hidden="true" />
                配慮
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
