import type { ReactNode } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-12">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
