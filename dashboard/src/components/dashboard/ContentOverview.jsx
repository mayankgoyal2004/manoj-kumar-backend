import React, { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import SectionCard from "@/components/kit/SectionCard";
import { useData } from "@/lib/DataStore";
import { CONTENT_KEYS, MODULES } from "@/lib/data/modules";

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  fontSize: 12,
  color: "hsl(var(--foreground))",
};

export default function ContentOverview() {
  const { collections, dashboardStats } = useData();

  const { pieData, total, statusRows, statusTotal } = useMemo(() => {
    const pie = (dashboardStats?.contentDistribution || [])
      .filter((entry) => CONTENT_KEYS.includes(entry.key) && entry.count > 0)
      .map((entry, index) => ({
        name: MODULES[entry.key]?.short || MODULES[entry.key]?.title || entry.label,
        value: entry.count,
        fill: CHART_COLORS[index % CHART_COLORS.length],
      }));

    const rows = (dashboardStats?.statusBreakdown || []).slice(0, 6);
    const statusSum = rows.reduce((acc, curr) => acc + curr.count, 0);

    return {
      pieData: pie,
      total: pie.reduce((sum, entry) => sum + entry.value, 0),
      statusRows: rows,
      statusTotal: statusSum,
    };
  }, [dashboardStats]);

  return (
    <div className="space-y-5">
      <SectionCard title="Content distribution" description="Records held across portfolio modules">
        <div className="relative h-[210px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip contentStyle={tooltipStyle} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={2}
                stroke="hsl(var(--card))"
                strokeWidth={2}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
            <p className="font-heading text-2xl font-semibold leading-none text-foreground">{total}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Records
            </p>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
          {pieData.slice(0, 6).map((entry) => (
            <li key={entry.name} className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: entry.fill }} />
              <span className="truncate text-muted-foreground">{entry.name}</span>
              <span className="ml-auto font-semibold text-foreground">{entry.value}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Content status summary" description="Publishing state across all modules">
        <ul className="space-y-4">
          {statusRows.map((row, index) => {
            const percent = statusTotal ? Math.round((row.count / statusTotal) * 100) : 0;
            return (
              <li key={row.status}>
                <div className="flex items-baseline justify-between gap-3 text-xs">
                  <span className="font-medium text-foreground">{row.status}</span>
                  <span className="text-muted-foreground">
                    {row.count} · {percent}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percent}%`,
                      background: CHART_COLORS[index % CHART_COLORS.length],
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </SectionCard>
    </div>
  );
}