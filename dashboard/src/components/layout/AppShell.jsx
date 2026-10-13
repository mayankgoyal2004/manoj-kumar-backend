import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { DataProvider, PROFILE } from "@/lib/DataStore";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";

function AppShellFooter() {
  const { user } = useAuth();
  const name = user?.full_name || PROFILE.name;
  const role = user?.department || PROFILE.honorific;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-1 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} {name} · {role}</p>
        <p>Executive Academic Portfolio Console</p>
      </div>
    </footer>
  );
}

export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DataProvider>
      <div className="min-h-screen bg-background">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((value) => !value)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            "flex min-h-screen flex-col transition-[padding] duration-300 ease-out",
            collapsed ? "lg:pl-[76px]" : "lg:pl-[272px]"
          )}
        >
          <Topbar onMenuClick={() => setMobileOpen(true)} />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1440px] animate-rise">{children}</div>
          </main>

          <AppShellFooter />
        </div>
      </div>
    </DataProvider>
  );
}