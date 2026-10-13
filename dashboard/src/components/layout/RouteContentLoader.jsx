import React from "react";

export default function RouteContentLoader({ title = "Loading content..." }) {
  return (
    <div className="space-y-6 animate-fade">
      {/* Header Skeleton */}
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 shadow-sm">
        {/* Shimmer beam */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-loader-shimmer [animation-duration:2.5s]" />
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2.5">
            <div className="h-3 w-32 rounded-full bg-amber-500/15 animate-pulse" />
            <div className="h-7 w-72 rounded-lg bg-muted/90" />
            <div className="h-3.5 w-96 max-w-full rounded-md bg-muted/60" />
          </div>
          <div className="flex gap-2.5 pt-2 sm:pt-0">
            <div className="h-9 w-28 rounded-lg bg-muted/70" />
            <div className="h-9 w-36 rounded-lg bg-primary/20" />
          </div>
        </div>
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 space-y-3.5 shadow-sm"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-loader-shimmer [animation-duration:2.2s]" />
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 rounded bg-muted/70" />
              <div className="h-9 w-9 rounded-xl bg-muted/60 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-primary/20 animate-pulse" />
              </div>
            </div>
            <div className="h-7 w-20 rounded-md bg-muted/90" />
            <div className="h-2.5 w-36 rounded bg-muted/40" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 space-y-5 shadow-sm">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-loader-shimmer [animation-duration:3s]" />
        
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="space-y-1.5">
            <div className="h-4 w-44 rounded-md bg-muted/80" />
            <div className="h-3 w-64 rounded bg-muted/50" />
          </div>
          <div className="h-9 w-64 rounded-lg bg-muted/60" />
        </div>

        <div className="space-y-4 pt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-muted/20 border border-border/20"
            >
              <div className="space-y-2 flex-1 pr-8">
                <div className="h-3.5 w-3/5 rounded bg-muted/80" />
                <div className="h-2.5 w-2/5 rounded bg-muted/50" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-20 rounded-full bg-amber-500/10" />
                <div className="h-7 w-7 rounded-lg bg-muted/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
