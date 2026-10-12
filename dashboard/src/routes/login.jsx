import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/auth/LoginPage";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Sign in · DAV University Academic Portfolio" }],
  }),
  component: LoginPage,
});