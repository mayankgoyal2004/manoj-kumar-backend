import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "@/components/kit/SectionCard";
import { chipCls } from "@/components/kit/styles";

const DATA = [
  { year: "2021", funding: 0.56 },
  { year: "2022", funding: 2.16 },
  { year: "2023", funding: 1.28 },
  { year: "2024", funding: 4.67 },
  { year: "2025", funding: 0.68 },
  { year: "2026", funding: 1.42 },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  fontSize: 12,
  color: "hsl(var(--foreground))",
  boxShadow: "0 12px 30px -12px hsl(215 50% 20% / 0.35)",
};

export default function FundingChart() {
  return (
    <SectionCard
      title="Sponsored research funding"
      description="Amount sanctioned per year, in crore rupees"
      actions={<span className={chipCls}>Amount in ₹ crore</span>}
    >
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 6, right: 8, left: -20, bottom: 0 }}>
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
            <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`₹${value} Cr`, "Sanctioned"]} />
            <Bar dataKey="funding" radius={[8, 8, 2, 2]} maxBarSize={44}>
              {DATA.map((entry) => (
                <Cell key={entry.year} fill="hsl(var(--chart-3))" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}