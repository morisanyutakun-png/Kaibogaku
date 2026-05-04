import { HeartPulse } from "lucide-react";

import { safetyDisclaimer } from "@/data/sources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SafetyNoteCard({ notes }: { notes?: string[] }) {
  return (
    <Card className="border-terracotta-200 bg-terracotta-50/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="size-4 text-terracotta-800" aria-hidden="true" />
          安全配慮
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-7 text-terracotta-950/85">
        <p>{safetyDisclaimer}</p>
        {notes?.length ? (
          <ul className="grid gap-2">
            {notes.map((note) => (
              <li key={note} className="rounded-2xl bg-white/55 p-3">
                {note}
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
