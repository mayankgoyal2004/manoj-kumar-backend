import React, { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, CircleDot, ScrollText, ShieldAlert } from "lucide-react";
import PageHeader from "@/components/kit/PageHeader";
import SectionCard from "@/components/kit/SectionCard";
import StatCard from "@/components/kit/StatCard";
import Timeline from "@/components/kit/Timeline";
import ListToolbar from "@/components/kit/ListToolbar";
import Pagination from "@/components/kit/Pagination";
import EmptyState from "@/components/kit/EmptyState";
import { useData } from "@/lib/DataStore";
import { formatDateTime, formatRelative } from "@/lib/format";

export const Route = createFileRoute("/_authed/activity-logs")({
  head: () => ({ meta: [{ title: "Activity Logs · Portfolio Console" }] }),
  component: ActivityLogsPage,
});

const PAGE_SIZE = 10;
const KINDS = ["create", "update", "publish", "archive", "delete"];
const KIND_LABEL = {
  create: "Created",
  update: "Updated",
  publish: "Published",
  archive: "Archived",
  delete: "Deleted",
};

function ActivityLogsPage() {
  const { collections } = useData();
  const logs = collections.activity || [];

  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("");
  const [actor, setActor] = useState("");
  const [sortValue, setSortValue] = useState("newest");
  const [page, setPage] = useState(1);

  const actors = useMemo(
    () => Array.from(new Set(logs.map((entry) => entry.actor))).sort(),
    [logs]
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = logs.filter((entry) => {
      const matchesTerm =
        !term ||
        [entry.actor, entry.action, entry.target, entry.module, entry.ip]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term));
      return matchesTerm && (!kind || entry.kind === kind) && (!actor || entry.actor === actor);
    });
    return list.sort((a, b) =>
      sortValue === "oldest"
        ? new Date(a.time) - new Date(b.time)
        : new Date(b.time) - new Date(a.time)
    );
  }, [logs, query, kind, actor, sortValue]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = useMemo(
    () => ({
      total: logs.length,
      creates: logs.filter((entry) => entry.kind === "create").length,
      updates: logs.filter((entry) => entry.kind === "update").length,
      deletions: logs.filter((entry) => entry.kind === "delete").length,
    }),
    [logs]
  );

  const items = paged.map((entry) => ({
    id: entry.id,
    actor: entry.actor,
    action: entry.action,
    target: entry.target,
    kind: entry.kind,
    timeLabel: formatDateTime(entry.time),
    meta: `${entry.module} · ${KIND_LABEL[entry.kind] || entry.kind} · ${entry.ip}`,
  }));

  return (
    <>
      <PageHeader
        eyebrow={`${stats.total} logged events`}
        title="Activity Logs"
        description="An auditable trail of every change made in the console, with actor, module and origin."
        breadcrumb={["Console", "Administration", "Activity Logs"]}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total events" value={stats.total} icon={Activity} hint="last 30 days" />
        <StatCard label="Records created" value={stats.creates} icon={CircleDot} tone="gold" />
        <StatCard label="Records updated" value={stats.updates} icon={ScrollText} tone="teal" />
        <StatCard label="Records deleted" value={stats.deletions} icon={ShieldAlert} tone="violet" />
      </div>

      <SectionCard
        flush
        title="Audit trail"
        description="Search by actor, record, module or origin address."
      >
        <ListToolbar
          query={query}
          onQueryChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          placeholder="Search the audit trail…"
          filters={[
            { key: "kind", label: "Event", options: KINDS.map((item) => KIND_LABEL[item]) },
            { key: "actor", label: "Actor", options: actors },
          ]}
          values={{ kind: kind ? KIND_LABEL[kind] : "", actor }}
          onFilterChange={(key, value) => {
            setPage(1);
            if (key === "kind") {
              setKind(KINDS.find((item) => KIND_LABEL[item] === value) || "");
            } else {
              setActor(value);
            }
          }}
          sortOptions={[
            { value: "newest", label: "Newest first" },
            { value: "oldest", label: "Oldest first" },
          ]}
          sortValue={sortValue}
          onSortChange={(value) => {
            setSortValue(value);
            setPage(1);
          }}
        />

        <div className="p-2 sm:p-3">
          {items.length > 0 ? (
            <Timeline items={items} />
          ) : (
            <EmptyState
              icon={ScrollText}
              title="No activity matches your filters"
              description="Try a different actor, event type or search term."
            />
          )}
        </div>

        <Pagination
          page={currentPage}
          pageCount={pageCount}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </SectionCard>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Latest event {formatRelative(logs[0]?.time)} · retention 24 months
      </p>
    </>
  );
}