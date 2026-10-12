import React, { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import GlobalSearch from "@/components/layout/GlobalSearch";
import NotificationsMenu from "@/components/layout/NotificationsMenu";
import ProfileMenu from "@/components/layout/ProfileMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Topbar({ onMenuClick }) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:text-foreground lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <Breadcrumbs />

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden h-9 items-center gap-2.5 rounded-lg border border-border bg-card px-3 text-xs text-muted-foreground transition hover:border-primary/30 hover:text-foreground sm:flex md:w-64"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search the console…</span>
            <span className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] md:inline">
              ⌘K
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:text-foreground sm:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <ThemeToggle />
          <NotificationsMenu />

          <ProfileMenu />
        </div>
      </div>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}