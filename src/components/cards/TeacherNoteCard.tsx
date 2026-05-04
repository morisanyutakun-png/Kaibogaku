import { ClipboardPenLine } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TeacherNoteCard({ notes }: { notes: string[] }) {
  return (
    <Card className="border-sand-200 bg-sand-50/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardPenLine className="size-4 text-sand-900" aria-hidden="true" />
          講師の視点
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 text-sm leading-7 text-sand-950/80">
          {notes.map((note) => (
            <li key={note} className="rounded-2xl bg-white/55 p-3">
              {note}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
