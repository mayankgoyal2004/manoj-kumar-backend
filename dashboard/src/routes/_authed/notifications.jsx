import React, { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  FileClock,
  Search,
  ShieldAlert,
  Sparkles,
  Trash2,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/kit/ConfirmDialog";
import EmptyState from "@/components/kit/EmptyState";
import PageHeader from "@/components/kit/PageHeader";
import SectionCard from "@/components/kit/SectionCard";
import StatCard from "@/components/kit/StatCard";
import StatusBadge from "@/components/kit/StatusBadge";
import { btnIcon, btnPrimary, btnSecondary, inputCls } from "@/components/kit/styles";
import { useData } from "@/lib/DataStore";
import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authed/notifications")({
  head: () => ({ meta: [{ title: "Notifications · Portfolio Console" }] }),
  component: NotificationsPage,
});

const KIND_ICON = { System: FileClock, Review: Sparkles, Publishing: Sparkles, Security: ShieldAlert };
const TABS = ["All", "Unread", "Read"];

function NotificationsPage() {
  const { collections, update, remove, fetchModule, loadingModules } = useData();

  useEffect(() => {
    if (fetchModule) {
      fetchModule("notifications", true);
    }
  }, [fetchModule]);
  const notifications = collections.notifications || [];

  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return notifications.filter((item) => {
      const matchesTab = tab === "All" || item.status === tab;
      const matchesTerm =
        !term ||
        [item.title, item.message, item.kind].some((value) =>
          String(value ?? "").toLowerCase().includes(term)
        );
      return matchesTab && matchesTerm;
    });
  }, [notifications, tab, query]);

  const unread = notifications.filter((item) => item.status === "Unread");
  const security = notifications.filter((item) => item.kind === "Security");

  const markAllRead = () => {
    unread.forEach((item) => update("notifications", item.id, { status: "Read" }));
    toast.success("All notifications marked as read");
  };

  const toggleRead = (item) => {
    const next = item.status === "Unread" ? "Read" : "Unread";
    update("notifications", item.id, { status: next });
    toast.success(next === "Read" ? "Marked as read" : "Marked as unread");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    remove("notifications", deleteTarget.id);
    toast.success("Notification deleted");
    setDeleteTarget(null);
  };

  return (
    <>
      <PageHeader
        eyebrow={`${unread.length} unread`}
        title="Notifications"
        description="System alerts, review requests and publishing updates delivered to your office."
        breadcrumb={["Console", "Administration", "Notifications"]}
        actions={
          <button type="button" className={btnPrimary} onClick={markAllRead} disabled={unread.length === 0}>
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Unread" value={unread.length} icon={Bell} tone="gold" hint="awaiting attention" />
        <StatCard label="Total received" value={notifications.length} icon={Check} hint="current retention window" />
        <StatCard label="Security alerts" value={security.length} icon={ShieldAlert} tone="violet" hint="account and access" />
      </div>

      <SectionCard flush title="Inbox" description="Filter, read and clear your notifications.">
        <div className="flex flex-col gap-3 border-b border-border bg-muted/25 px-4 py-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {TABS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={cn(
                  "rounded-md px-3.5 py-1.5 text-xs font-semibold transition",
                  tab === item
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item}
                {item === "Unread" && unread.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-[hsl(var(--gold))] px-1.5 text-[10px] text-white">
                    {unread.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <label className="relative lg:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className={`${inputCls} pl-10`}
              placeholder="Search notifications…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={BellOff}
            title="Nothing here"
            description={
              tab === "Unread"
                ? "You have read every notification — the inbox is clear."
                : "No notifications match your search."
            }
          />
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((item) => {
              const Icon = KIND_ICON[item.kind] || Bell;
              const isUnread = item.status === "Unread";
              return (
                <li
                  key={item.id}
                  className={cn(
                    "flex gap-4 px-4 py-4 transition sm:px-5",
                    isUnread ? "bg-[hsl(var(--gold)/0.05)]" : "hover:bg-muted/40"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                      isUnread
                        ? "bg-[hsl(var(--gold)/0.14)] text-[hsl(var(--gold))]"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className={cn(
                          "text-sm",
                          isUnread ? "font-semibold text-foreground" : "font-medium text-foreground"
                        )}
                      >
                        {item.title}
                      </p>
                      <StatusBadge value={item.kind} dot={false} />
                      {isUnread && <StatusBadge value="Unread" />}
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.message}</p>
                    {item.link && (
                      <Link
                        to={item.link.startsWith('/contact-messages') ? '/contact-messages' : item.link}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        onClick={() => {
                          if (isUnread) update("notifications", item.id, { status: "Read" });
                        }}
                      >
                        <span>View in Contact Messages &rarr;</span>
                      </Link>
                    )}
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {formatRelative(item.updated_date)} · {item.time}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row sm:items-start">
                    <button
                      type="button"
                      className={btnIcon}
                      aria-label={isUnread ? "Mark as read" : "Mark as unread"}
                      title={isUnread ? "Mark as read" : "Mark as unread"}
                      onClick={() => toggleRead(item)}
                    >
                      {isUnread ? <Check className="h-3.5 w-3.5" /> : <Undo2 className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      type="button"
                      className={`${btnIcon} hover:border-destructive/40 hover:text-destructive`}
                      aria-label="Delete notification"
                      title="Delete notification"
                      onClick={() => setDeleteTarget(item)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3.5">
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {notifications.length} notifications
            </p>
            <button type="button" className={btnSecondary} onClick={markAllRead} disabled={unread.length === 0}>
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          </div>
        )}
      </SectionCard>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete this notification?"
        description={deleteTarget ? `“${deleteTarget.title}” will be removed from your inbox.` : ""}
        confirmLabel="Delete notification"
      />
    </>
  );
}