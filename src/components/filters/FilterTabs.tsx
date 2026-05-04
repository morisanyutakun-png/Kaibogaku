"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  value: string;
  options: Array<string | { label: string; value: string }>;
  onChange: (value: string) => void;
  ariaLabel: string;
}

export function FilterTabs({ value, options, onChange, ariaLabel }: FilterTabsProps) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList
        className="h-auto w-full justify-start overflow-x-auto rounded-full border border-border/70 bg-white/65 p-1"
        aria-label={ariaLabel}
      >
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;

          return (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-sage-100 data-[state=active]:text-sage-950"
            >
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
