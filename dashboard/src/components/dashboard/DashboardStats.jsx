import React, { useMemo } from "react";
import { BookOpenText, IndianRupee, Quote, UsersRound } from "lucide-react";
import StatCard from "@/components/kit/StatCard";
import { useData } from "@/lib/DataStore";
import { formatINR } from "@/lib/format";

export default function DashboardStats() {
  const { collections, dashboardStats } = useData();

  const stats = useMemo(() => {
    if (dashboardStats?.summary) {
      return {
        publications: dashboardStats.summary.publications ?? 0,
        citations: dashboardStats.summary.totalCitations ?? 0,
        ongoing: dashboardStats.summary.supervision ?? 0,
        scholars: dashboardStats.summary.supervision ?? 0,
        funding: dashboardStats.summary.grantsAmount ?? 0,
        activeGrants: dashboardStats.summary.activeGrants ?? 0,
      };
    }

    const publications = collections.publications || [];
    const citations = publications.reduce((sum, row) => sum + (Number(row.citations) || 0), 0);
    const scholars = collections.supervision || [];
    const grants = collections.grants || [];
    return {
      publications: publications.length,
      citations,
      ongoing: scholars.filter((row) => row.status === "Ongoing").length,
      scholars: scholars.length,
      funding: grants.reduce((sum, row) => sum + (Number(row.amount) || 0), 0),
      activeGrants: grants.filter((row) => row.status === "Active").length,
    };
  }, [collections, dashboardStats]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Research publications"
        value={stats.publications}
        hint="indexed in this portfolio"
        icon={BookOpenText}
        trend={{ value: "+12%", direction: "up" }}
      />
      <StatCard
        label="Total citations"
        value={stats.citations.toLocaleString("en-IN")}
        hint="Scopus · Web of Science"
        icon={Quote}
        tone="gold"
        trend={{ value: "+18%", direction: "up" }}
      />
      <StatCard
        label="Doctoral scholars"
        value={stats.ongoing}
        hint={`of ${stats.scholars} supervised in total`}
        icon={UsersRound}
        tone="teal"
      />
      <StatCard
        label="Research funding"
        value={formatINR(stats.funding)}
        hint={`${stats.activeGrants} active sanctions`}
        icon={IndianRupee}
        tone="violet"
      />
    </div>
  );
}