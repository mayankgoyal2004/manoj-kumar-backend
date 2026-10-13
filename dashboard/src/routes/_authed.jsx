import React, { useEffect, Suspense } from "react";
import { Outlet, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import AppShell from "@/components/layout/AppShell";
import FullPageLoader from "@/components/layout/FullPageLoader";
import RouteContentLoader from "@/components/layout/RouteContentLoader";
import { useAuth } from "@/lib/AuthContext";
import { getAuthToken } from "@/api/backendClient";

export const Route = createFileRoute("/_authed")({
  ssr: false,
  beforeLoad: ({ location }) => {
    if (typeof window !== "undefined") {
      const token = getAuthToken();
      if (!token) {
        throw redirect({
          to: "/login",
          search: {
            redirect: location.href,
          },
        });
      }
    }
  },
  pendingComponent: FullPageLoader,
  component: AuthedLayout,
});

function AuthedLayout() {
  const { user, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (!token || (!isLoadingAuth && !user)) {
      navigate({ to: "/login", replace: true });
    }
  }, [user, isLoadingAuth, navigate]);

  if (isLoadingAuth || !user) {
    return <FullPageLoader message={isLoadingAuth ? "Authenticating session..." : "Preparing console..."} />;
  }

  return (
    <AppShell>
      <Suspense fallback={<RouteContentLoader />}>
        <Outlet />
      </Suspense>
    </AppShell>
  );
}