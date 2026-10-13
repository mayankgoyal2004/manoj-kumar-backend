import React from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  BookOpenText,
  FolderOpen,
  Globe,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import SectionCard from "@/components/kit/SectionCard";

const ACTIONS = [
  {
    to: "/publications",
    label: "Add a publication",
    hint: "Journal article or conference paper",
    icon: BookOpenText,
  },
  {
    to: "/news",
    label: "Publish a news item",
    hint: "Press coverage or announcement",
    icon: Newspaper,
  },
  {
    to: "/media-library",
    label: "Upload media",
    hint: "Images, video and brand assets",
    icon: FolderOpen,
  },
  {
    to: "/users",
    label: "Invite a user",
    hint: "Grant editorial access",
    icon: ShieldCheck,
  },
  {
    to: "/notifications",
    label: "Review notifications",
    hint: "Alerts awaiting your attention",
    icon: Bell,
  },
  {
    to: "/website-settings",
    label: "Website settings",
    hint: "Identity, themes and branding",
    icon: Globe,
  },
];

export default function QuickActions() {
  return (
    <SectionCard title="Quick actions" description="Jump straight to the task you need">
      <ul className="space-y-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <li key={action.to}>
              <Link
                to={action.to}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {action.label}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {action.hint}
                  </span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}