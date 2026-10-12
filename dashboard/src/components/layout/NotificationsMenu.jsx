import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, CheckCheck, ShieldAlert, Sparkles, FileClock } from "lucide-react";
import { useData } from "@/lib/DataStore";
import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";

const KIND_ICON = {
  System: FileClock,
  Review: Sparkles,
  Publishing: Sparkles,
  Security: ShieldAlert,
};

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const { collections, update } = useData();
  const notifications = collections.notifications || [];
  const unread = notifications.filter((item) => item.status === "Unread");

  const markAllRead = () =>
    unread.forEach((item) => update("notifications", item.id, { status: "Read" }));

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Notifications"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-primary/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
      >
        <Bell className="h-4 w-4" />
        {unread.length > 0 && (
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[hsl(var(--gold))] px-1 text-[10px] font-bold text-white ring-2 ring-background">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="animate-rise absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="font-heading text-sm font-semibold text-foreground">Notifications</p>
              {unread.length > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary transition hover:opacity-80"
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                </button>
              )}
            </div>

            <ul className="max-h-80 divide-y divide-border overflow-y-auto">
              {notifications.slice(0, 5).map((item) => {
                const Icon = KIND_ICON[item.kind] || Bell;
                return (
                  <li key={item.id}>
                    <Link
                      to="/notifications"
                      onClick={() => setOpen(false)}
                      className="flex gap-3 px-4 py-3 transition hover:bg-muted/60"
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                          item.status === "Unread"
                            ? "bg-[hsl(var(--gold)/0.14)] text-[hsl(var(--gold))]"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span
                            className={cn(
                              "truncate text-[13px]",
                              item.status === "Unread"
                                ? "font-semibold text-foreground"
                                : "font-medium text-muted-foreground"
                            )}
                          >
                            {item.title}
                          </span>
                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            {formatRelative(item.updated_date)}
                          </span>
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-[11px] leading-relaxed text-muted-foreground">
                          {item.message}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
              {notifications.length === 0 && (
                <li className="px-4 py-8 text-center text-xs text-muted-foreground">
                  You're all caught up.
                </li>
              )}
            </ul>

            <Link
              to="/notifications"
              onClick={() => setOpen(false)}
              className="block border-t border-border bg-muted/40 px-4 py-3 text-center text-xs font-semibold text-primary transition hover:bg-muted"
            >
              View all notifications
            </Link>
          </div>
        </>
      )}
    </div>
  );
}