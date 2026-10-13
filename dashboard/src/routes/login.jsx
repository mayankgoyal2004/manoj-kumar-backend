import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "@/components/auth/LoginPage";
import { getAuthToken } from "@/api/backendClient";

export const Route = createFileRoute("/login")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const token = getAuthToken();
      if (token) {
        throw redirect({ to: "/" });
      }
    }
  },
  head: () => ({
    meta: [{ title: "Sign in · DAV University Academic Portfolio" }],
  }),
  component: LoginPage,
});