import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/publications")({
  head: () => ({ meta: [{ title: "Research Publications · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="publications" />,
});