import React, { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, X } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/navConfig";
import { cn, resolveImageUrl } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";
import { useData } from "@/lib/DataStore";
import { initials } from "@/lib/format";

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { user } = useAuth();
  const { actor } = useData();
  const [photoError, setPhotoError] = useState(false);
  const photo = user?.avatar || "/images/prof_manoj_kumar.jpg";
  const name = user?.full_name || actor?.name || "Manoj Kumar";
  const role = user?.department || "Vice-Chancellor";

  const isActive = (item) =>
    pathname === item.to || (item.to !== "/" && pathname.startsWith(`${item.to}/`));

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onMobileClose}
          className="animate-fade fixed inset-0 z-40 cursor-default bg-foreground/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-out",
          collapsed ? "w-[76px]" : "w-[272px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 shrink-0 items-center gap-3 px-4">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15">
            {!photoError && photo ? (
              <img
                src={resolveImageUrl(photo)}
                alt={name}
                onError={() => setPhotoError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="grid h-full w-full place-items-center text-[11px] font-bold tracking-wider text-[hsl(var(--gold))]">
                {initials(name)}
              </span>
            )}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-semibold leading-tight text-white">
                {name}
              </p>
              <p className="truncate text-[10px] uppercase tracking-[0.16em] text-white/45">
                {role}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close navigation"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              {collapsed ? (
                <div className="mx-2 my-3 h-px bg-white/10" />
              ) : (
                <p className="px-3 pb-1.5 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  {section.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        title={item.label}
                        onClick={onMobileClose}
                        className={cn(
                          "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                          collapsed && "justify-center px-0",
                          active
                            ? "bg-white/[0.11] font-semibold text-white"
                            : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                        )}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[hsl(var(--gold))]" />
                        )}
                        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "hidden w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-white/55 transition hover:bg-white/[0.06] hover:text-white lg:flex",
              collapsed && "justify-center px-0"
            )}
          >
            <ChevronLeft
              className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")}
            />
            {!collapsed && "Collapse sidebar"}
          </button>
        </div>
      </aside>
    </>
  );
}