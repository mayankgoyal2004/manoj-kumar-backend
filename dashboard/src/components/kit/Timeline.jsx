import React from "react";
import { cn } from "@/lib/utils";

const DOT_TONES = {
  create: "bg-emerald-500",
  update: "bg-sky-500",
  publish: "bg-[hsl(var(--gold))]",
  delete: "bg-rose-500",
  archive: "bg-slate-400",
};

export default function Timeline({ items, className }) {
  return (
    <ol className={cn("relative space-y-1", className)}>
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-4 rounded-xl px-3 py-3 transition hover:bg-muted/50">
          <div className="relative flex w-3 shrink-0 justify-center">
            <span
              className={cn(
                "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-card",
                DOT_TONES[item.kind] || "bg-primary"
              )}
            />
            {index !== items.length - 1 && (
              <span className="absolute top-5 h-[calc(100%-0.5rem)] w-px bg-border" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{item.actor}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>{" "}
                <span className="font-medium">{item.target}</span>
              </p>
              <span className="text-xs text-muted-foreground">{item.timeLabel}</span>
            </div>
            {item.meta && <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}