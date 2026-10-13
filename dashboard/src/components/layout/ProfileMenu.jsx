import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, LogOut, ScrollText, Settings2, UserRound } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { PROFILE } from "@/lib/DataStore";
import { initials } from "@/lib/format";

import { resolveImageUrl } from "@/lib/utils";

const LINKS = [
  { to: "/profile", label: "Profile Management", icon: UserRound },
  { to: "/account-settings", label: "Account Settings", icon: Settings2 },
  { to: "/activity-logs", label: "Activity Logs", icon: ScrollText },
];

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const name = user?.full_name || PROFILE.name;
  const email = user?.email || PROFILE.email;
  const avatar = user?.avatar;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2.5 rounded-lg border border-border bg-card py-1.5 pl-1.5 pr-2.5 transition hover:border-primary/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
      >
        {avatar ? (
          <img
            src={resolveImageUrl(avatar)}
            alt={name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.style.display = "grid";
              }
            }}
            className="h-7 w-7 rounded-md object-cover ring-1 ring-border"
          />
        ) : null}
        <span
          style={{ display: avatar ? "none" : "grid" }}
          className="h-7 w-7 place-items-center rounded-md bg-primary text-[10px] font-bold tracking-wide text-primary-foreground"
        >
          {initials(name)}
        </span>
        <span className="hidden text-left leading-tight lg:block">
          <span className="block max-w-[9.5rem] truncate text-xs font-semibold text-foreground">
            {name}
          </span>
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
            {user?.department || "Vice-Chancellor"}
          </span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="animate-rise absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
            <div className="border-b border-border px-4 py-3.5 flex items-center gap-3">
              {avatar ? (
                <img
                  src={resolveImageUrl(avatar)}
                  alt={name}
                  className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-border"
                />
              ) : (
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                  {initials(name)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{name}</p>
                <p className="truncate text-xs text-muted-foreground">{email}</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--gold)/0.35)] bg-[hsl(var(--gold)/0.12)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--gold))]">
                  {user?.role || "Super Admin"}
                </span>
              </div>
            </div>

            <ul className="p-1.5">
              {LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                logout();
                navigate({ to: "/login", replace: true });
              }}
              className="flex w-full items-center gap-3 border-t border-border px-4 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/5 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}