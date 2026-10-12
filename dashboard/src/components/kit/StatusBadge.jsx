import React from "react";
import { cn } from "@/lib/utils";

const TONES = {
  green: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  amber: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  blue: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  red: "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  gold: "border-[hsl(var(--gold)/0.35)] bg-[hsl(var(--gold)/0.12)] text-[hsl(var(--gold))]",
  slate: "border-border bg-muted text-muted-foreground",
};

const STATUS_TONE = {
  published: "green",
  active: "green",
  awarded: "green",
  granted: "green",
  verified: "green",
  current: "green",
  delivered: "green",
  signed: "green",
  accepted: "green",
  draft: "amber",
  pending: "amber",
  nominated: "amber",
  "in press": "amber",
  scheduled: "amber",
  invited: "amber",
  sanctioned: "amber",
  submitted: "amber",
  filed: "amber",
  "under review": "amber",
  ongoing: "blue",
  read: "slate",
  completed: "slate",
  archived: "slate",
  expired: "red",
  suspended: "red",
  revoked: "red",
  rejected: "red",
  overdue: "red",
  unread: "gold",
  featured: "gold",
};

export default function StatusBadge({ value, dot = true, className }) {
  const label = value || "—";
  const tone = TONES[STATUS_TONE[String(label).toLowerCase()]] || TONES.slate;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        tone,
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {label}
    </span>
  );
}