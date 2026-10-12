import React from "react";
import { ChevronRight } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { findNavItem } from "@/lib/navConfig";

export default function Breadcrumbs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const item = findNavItem(pathname);
  const crumbs = [item?.section || "Console", item?.label || "Overview"].filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-xs md:flex">
      <span className="text-muted-foreground">Console</span>
      {crumbs.map((crumb, index) => (
        <span key={crumb} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span
            className={
              index === crumbs.length - 1 ? "font-medium text-foreground" : "text-muted-foreground"
            }
          >
            {crumb}
          </span>
        </span>
      ))}
    </nav>
  );
}