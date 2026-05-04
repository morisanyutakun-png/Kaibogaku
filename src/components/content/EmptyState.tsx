import { SearchX } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-dashed bg-white/50 py-8 text-center">
      <CardContent>
        <SearchX className="mx-auto mb-3 size-8 text-muted-foreground" aria-hidden="true" />
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
