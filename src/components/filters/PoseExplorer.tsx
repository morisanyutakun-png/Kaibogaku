"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/content/EmptyState";
import { FilterTabs } from "@/components/filters/FilterTabs";
import { SearchInput } from "@/components/filters/SearchInput";
import { PoseCard } from "@/components/cards/PoseCard";
import type { Pose } from "@/types/content";
import { uniqueValues } from "@/lib/content-utils";

export function PoseExplorer({ poses }: { poses: Pose[] }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("すべて");
  const [difficulty, setDifficulty] = useState("すべて");

  const bodyAreas = useMemo(
    () => ["すべて", ...uniqueValues(poses.flatMap((pose) => pose.bodyAreas))],
    [poses]
  );
  const difficulties = ["すべて", "やさしい", "標準", "注意深く"];

  const filteredPoses = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return poses.filter((pose) => {
      const matchesArea = area === "すべて" || pose.bodyAreas.includes(area);
      const matchesDifficulty = difficulty === "すべて" || pose.difficulty === difficulty;
      const haystack = [
        pose.nameJa,
        pose.nameEn,
        pose.sanskritName ?? "",
        pose.summary,
        ...pose.mainJoints,
        ...pose.mainMuscles,
        ...pose.teachingFocus,
      ]
        .join(" ")
        .toLowerCase();

      return matchesArea && matchesDifficulty && (!normalized || haystack.includes(normalized));
    });
  }, [area, difficulty, poses, query]);

  return (
    <div className="space-y-6">
      <SearchInput value={query} onChange={setQuery} placeholder="ポーズ名、関節、筋肉を検索" />
      <div className="grid gap-3 xl:grid-cols-2">
        <FilterTabs value={area} options={bodyAreas} onChange={setArea} ariaLabel="body area" />
        <FilterTabs
          value={difficulty}
          options={difficulties}
          onChange={setDifficulty}
          ariaLabel="difficulty"
        />
      </div>
      {filteredPoses.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPoses.map((pose) => (
            <PoseCard key={pose.id} pose={pose} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="該当するポーズがありません"
          description="検索語、部位、難易度の条件を変えてみてください。"
        />
      )}
    </div>
  );
}
