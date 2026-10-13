import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { DataProvider, PROFILE } from "@/lib/DataStore";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";

import api from "@/api/backendClient";

function AppShellFooter() {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();
  const fallbackFooter = `© ${currentYear} ${user?.full_name || PROFILE.name} · ${user?.department || PROFILE.honorific}`;
  const [footerNote, setFooterNote] = useState(fallbackFooter);

  useEffect(() => {
    let active = true;
    const fetchFooter = async () => {
      try {
        const settings = await api.settings.getWebsiteSettings();
        if (active && settings?.footer) {
          setFooterNote(settings.footer);
        }
      } catch (err) {
        // Fallback already set
      }
    };
    fetchFooter();

    const handleSettingsUpdated = (e) => {
      if (e?.detail?.footer) {
        setFooterNote(e.detail.footer);
      } else {
        fetchFooter();
      }
    };
    window.addEventListener("settings:updated", handleSettingsUpdated);
    return () => {
      active = false;
      window.removeEventListener("settings:updated", handleSettingsUpdated);
    };
  }, []);

  return (
    <footer className="border-t border-border px-4 py-4 sm:px-6 lg:px-8 bg-card/40">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between text-xs text-muted-foreground">
        <p className="font-medium text-foreground/80">{footerNote}</p>
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