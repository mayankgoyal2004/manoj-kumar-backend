import React from "react";
import { cn } from "@/lib/utils";

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-16 text-center", className)}>
      {Icon && (
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-border bg-muted/60 text-muted-foreground">
          <Icon className="h-6 w-6" strokeWidth={1.6} />
        </span>
      )}
      <h3 className="font-heading text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}