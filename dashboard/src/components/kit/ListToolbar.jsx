import React from "react";
import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { inputCls, selectCls, btnGhost } from "@/components/kit/styles";

export default function ListToolbar({
  query,
  onQueryChange,
  placeholder = "Search records…",
  filters = [],
  values = {},
  onFilterChange,
  sortOptions = [],
  sortValue,
  onSortChange,
  right,
}) {
  const activeFilters = filters.filter((filter) => values[filter.key]).length;
  const hasAny = Boolean(query) || activeFilters > 0;

  return (
    <div className="flex flex-col gap-3 border-b border-border bg-muted/25 px-4 py-3.5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
        <label className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className={`${inputCls} pl-10`}
            placeholder={placeholder}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>

        {filters.map((filter) => (
          <label key={filter.key} className="relative sm:w-48">
            <span className="sr-only">{filter.label}</span>
            <select
              className={selectCls}
              value={values[filter.key] || ""}
              onChange={(event) => onFilterChange(filter.key, event.target.value)}
            >
              <option value="">{filter.label}: All</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </label>
        ))}

        {hasAny && (
          <button
            type="button"
            className={btnGhost}
            onClick={() => {
              onQueryChange("");
              filters.forEach((filter) => onFilterChange(filter.key, ""));
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {sortOptions.length > 0 && (
          <label className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              className={`${selectCls} pl-10`}
              value={sortValue}
              onChange={(event) => onSortChange(event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </label>
        )}
        {right}
      </div>
    </div>
  );
}