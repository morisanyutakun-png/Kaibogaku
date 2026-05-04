"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/content/EmptyState";
import { FilterTabs } from "@/components/filters/FilterTabs";
import { SearchInput } from "@/components/filters/SearchInput";
import { LessonCard } from "@/components/cards/LessonCard";
import type { Lesson } from "@/types/content";

const categories = ["すべて", "基礎解剖学", "関節", "筋肉", "ポーズ", "安全配慮"];

export function LessonExplorer({ lessons }: { lessons: Lesson[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("すべて");

  const filteredLessons = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return lessons.filter((lesson) => {
      const matchesCategory = category === "すべて" || lesson.category === category;
      const haystack = [lesson.title, lesson.summary, lesson.bodyArea, lesson.level, ...lesson.tags]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [category, lessons, query]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="レッスン、部位、タグを検索" />
        <FilterTabs
          value={category}
          options={categories}
          onChange={setCategory}
          ariaLabel="レッスンカテゴリ"
        />
      </div>
      {filteredLessons.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="該当するレッスンがありません"
          description="検索語やカテゴリを少し広げると、関連する教材が見つかるかもしれません。"
        />
      )}
    </div>
  );
}
