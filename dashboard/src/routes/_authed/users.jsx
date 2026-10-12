import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/users")({
  head: () => ({ meta: [{ title: "Users & Roles · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="users" />,
});