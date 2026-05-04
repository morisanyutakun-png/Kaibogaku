import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <Card className="max-w-lg bg-white/75 text-center">
        <CardContent className="p-8">
          <p className="text-sm font-medium text-sage-800">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">教材が見つかりません</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            URLが変わったか、まだ公開されていない教材かもしれません。レッスン一覧から学習を続けられます。
          </p>
          <Link href="/lessons">
            <Button className="mt-6 rounded-full bg-charcoal-900 text-white hover:bg-charcoal-800">
              レッスン一覧へ
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
