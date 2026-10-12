import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/components/kit/SectionCard";

const DATA = [
  { year: "2019", publications: 9, citations: 210 },
  { year: "2020", publications: 11, citations: 320 },
  { year: "2021", publications: 14, citations: 430 },
  { year: "2022", publications: 17, citations: 560 },
  { year: "2023", publications: 19, citations: 690 },
  { year: "2024", publications: 22, citations: 880 },
  { year: "2025", publications: 26, citations: 1120 },
  { year: "2026", publications: 24, citations: 1290 },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  fontSize: 12,
  color: "hsl(var(--foreground))",
  boxShadow: "0 12px 30px -12px hsl(215 50% 20% / 0.35)",
};

export default function ResearchOutputChart() {
  return (
    <SectionCard
      title="Research output"
      description="Indexed publications and citations per academic year"
      actions={
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]" /> Publications
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-2))]" /> Citations
          </span>
        </div>
      }
    >
      <div className="h-[264px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="fillPublications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.32} />
                <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillCitations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.28} />
                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              width={46}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="citations"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              fill="url(#fillCitations)"
            />
            <Area
              type="monotone"
              dataKey="publications"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2.5}
              fill="url(#fillPublications)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}