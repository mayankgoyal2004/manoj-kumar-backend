import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatCard({ label, value, hint, icon: Icon, trend, tone = "navy" }) {
  const toneCls = {
    navy: "bg-primary/10 text-primary",
    gold: "bg-[hsl(var(--gold)/0.14)] text-[hsl(var(--gold))]",
    teal: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  }[tone];

  return (
    <div className="surface surface-shadow group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="label-caps">{label}</p>
          <p className="mt-3 font-heading text-3xl font-semibold leading-none tracking-tight text-foreground">
            {value}
          </p>
        </div>
        {Icon && (
          <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", toneCls)}>
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs">
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold",
              trend.direction === "down"
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-300"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
            )}
          >
            {trend.direction === "down" ? (
              <ArrowDownRight className="h-3 w-3" />
            ) : (
              <ArrowUpRight className="h-3 w-3" />
            )}
            {trend.value}
          </span>
        )}
        {hint && <span className="truncate text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}