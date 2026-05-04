import { ListChecks } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KeyPointCard({ points }: { points: string[] }) {
  return (
    <Card className="bg-white/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="size-4 text-sage-700" aria-hidden="true" />
          このページで学ぶこと
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 text-sm leading-7 text-muted-foreground">
          {points.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sage-500" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
