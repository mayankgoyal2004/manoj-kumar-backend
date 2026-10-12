import React from "react";
import { cn } from "@/lib/utils";

export default function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
  flush = false,
}) {
  return (
    <section className={cn("surface surface-shadow overflow-hidden", className)}>
      {(title || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            {title && (
              <h2 className="font-heading text-base font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={cn(flush ? "" : "p-5", bodyClassName)}>{children}</div>
    </section>
  );
}