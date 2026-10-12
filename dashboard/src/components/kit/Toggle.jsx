import React from "react";
import { cn } from "@/lib/utils";

export default function Toggle({ checked, onChange, label, description, id }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <label htmlFor={id} className="block text-sm font-medium text-foreground">
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
          checked ? "bg-primary" : "bg-muted-foreground/25"
        )}
      >
        <span
          className={cn(
            "inline-block h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-300",
            checked ? "translate-x-[26px]" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}