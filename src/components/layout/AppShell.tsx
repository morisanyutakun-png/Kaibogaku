import type { ReactNode } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 pb-32 pt-5 sm:px-6 lg:px-8 lg:pb-14">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
