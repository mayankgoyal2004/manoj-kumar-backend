import React, { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, History } from "lucide-react";
import SectionCard from "@/components/kit/SectionCard";
import Timeline from "@/components/kit/Timeline";
import StatusBadge from "@/components/kit/StatusBadge";
import { useData } from "@/lib/DataStore";
import { CONTENT_KEYS, MODULES, recordTitle } from "@/lib/data/modules";
import { formatRelative } from "@/lib/format";
import { MODULE_ROUTES } from "@/lib/navConfig";

export default function PortfolioActivity() {
  const { collections } = useData();

  const timelineItems = useMemo(
    () =>
      (collections.activity || []).slice(0, 6).map((entry) => ({
        id: entry.id,
        actor: entry.actor,
        action: entry.action,
        target: entry.target,
        kind: entry.kind,
        timeLabel: formatRelative(entry.time),
        meta: entry.module,
      })),
    [collections.activity]
  );

  const recentlyUpdated = useMemo(() => {
    const records = [];
    CONTENT_KEYS.forEach((key) => {
      (collections[key] || []).forEach((row) => {
        records.push({
          id: row.id,
          key,
          title: recordTitle(key, row),
          module: MODULES[key].short || MODULES[key].title,
          status: row.status,
          updated: row.updated_date,
        });
      });
    });
    return records
      .sort((a, b) => new Date(b.updated) - new Date(a.updated))
      .slice(0, 6);
  }, [collections]);

  return (
    <div className="space-y-5">
      <SectionCard
        title="Recent activity"
        description="Every change made in this console, newest first"
        actions={
          <Link
            to="/activity-logs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:opacity-80"
          >
            Full log <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      >
        <Timeline items={timelineItems} />
      </SectionCard>

      <SectionCard
        title="Recently updated records"
        description="Latest edits across the portfolio"
        flush
      >
        <ul className="divide-y divide-border">
          {recentlyUpdated.map((record) => (
            <li key={record.id}>
              <Link
                to={MODULE_ROUTES[record.key] || "/"}
                className="group flex items-center gap-4 px-5 py-3.5 transition hover:bg-muted/50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <History className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {record.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">
                    {record.module} · {formatRelative(record.updated)}
                  </span>
                </span>
                <StatusBadge value={record.status} />
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}