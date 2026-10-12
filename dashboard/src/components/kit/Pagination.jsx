import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({ page, pageCount, total, pageSize, onPageChange }) {
  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(pageCount, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const pages = [];
  for (let i = start; i <= end; i += 1) pages.push(i);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-4 py-3.5 sm:flex-row">
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{from}</span>–
        <span className="font-semibold text-foreground">{to}</span> of{" "}
        <span className="font-semibold text-foreground">{total}</span> records
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {start > 1 && <span className="px-1 text-xs text-muted-foreground">…</span>}

        {pages.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => onPageChange(number)}
            className={cn(
              "h-8 min-w-8 rounded-lg px-2 text-xs font-semibold transition",
              number === page
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {number}
          </button>
        ))}

        {end < pageCount && <span className="px-1 text-xs text-muted-foreground">…</span>}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          disabled={page >= pageCount}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}