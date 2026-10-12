import React, { useEffect } from "react";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/lib/AuthContext";

export const Route = createFileRoute("/_authed")({
  component: AuthedLayout,
});

function AuthedLayout() {
  const { user, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingAuth && !user) {
      navigate({ to: "/login", replace: true });
    }
  }, [user, isLoadingAuth, navigate]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a192f] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <span className="text-xs text-slate-300 font-medium tracking-wide">Signing out...</span>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}