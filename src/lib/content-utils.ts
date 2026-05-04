import type { Source } from "@/types/content";

export function getSourcesByIds(sourceIds: string[], sources: Source[]): Source[] {
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  const uniqueSourceIds = Array.from(new Set(sourceIds));

  return uniqueSourceIds
    .map((sourceId) => sourceMap.get(sourceId))
    .filter((source): source is Source => Boolean(source));
}

export function hasSourceIds(sourceIds: string[] | undefined): boolean {
  return Boolean(sourceIds?.length);
}

export function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "ja"));
}
