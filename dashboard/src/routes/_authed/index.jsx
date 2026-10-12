import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import PageHeader from "@/components/kit/PageHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ResearchOutputChart from "@/components/dashboard/ResearchOutputChart";
import FundingChart from "@/components/dashboard/FundingChart";
import ContentOverview from "@/components/dashboard/ContentOverview";
import PortfolioActivity from "@/components/dashboard/PortfolioActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { btnSecondary } from "@/components/kit/styles";

export const Route = createFileRoute("/_authed/")({
  head: () => ({ meta: [{ title: "Portfolio Overview · Console" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Academic year 2026 – 27"
        title="Welcome back, Dr. Kumar"
        description="A live view of the academic portfolio: research output, funding, scholars, content health and everything your office updated recently."
        breadcrumb={["Console", "Overview"]}
        actions={
          <Link to="/notifications" className={btnSecondary}>
            <Bell className="h-4 w-4" />
            Review notifications
          </Link>
        }
      />

      <DashboardStats />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <ResearchOutputChart />
          <FundingChart />
        </div>
        <ContentOverview />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PortfolioActivity />
        </div>
        <QuickActions />
      </div>
    </>
  );
}