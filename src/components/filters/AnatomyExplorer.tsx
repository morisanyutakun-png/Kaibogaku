"use client";

import { useMemo, useState } from "react";

import { AnatomyCard } from "@/components/cards/AnatomyCard";
import { EmptyState } from "@/components/content/EmptyState";
import { FilterTabs } from "@/components/filters/FilterTabs";
import { SearchInput } from "@/components/filters/SearchInput";
import type { AnatomyItem, AnatomyType } from "@/types/content";

const tabs: Array<{ label: string; value: "すべて" | AnatomyType }> = [
  { label: "All", value: "すべて" },
  { label: "Muscles", value: "muscle" },
  { label: "Joints", value: "joint" },
  { label: "Bones", value: "bone" },
  { label: "Concepts", value: "concept" },
];

export function AnatomyExplorer({ items }: { items: AnatomyItem[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("すべて");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesType = type === "すべて" || item.type === type;
      const haystack = [
        item.nameJa,
        item.nameEn,
        item.category,
        item.summary,
        ...item.meaningForYogaTeachers,
        ...item.observationPoints,
      ]
        .join(" ")
        .toLowerCase();

      return matchesType && (!normalized || haystack.includes(normalized));
    });
  }, [items, query, type]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="筋肉、関節、観察ポイントを検索"
        />
        <FilterTabs value={type} options={tabs} onChange={setType} ariaLabel="anatomy type" />
      </div>
      {filteredItems.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <AnatomyCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="該当する解剖カードがありません"
          description="検索語やタブを変えて、関連するカードを探してみてください。"
        />
      )}
    </div>
  );
}
