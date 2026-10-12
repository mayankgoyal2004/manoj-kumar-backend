import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/grants")({
  head: () => ({ meta: [{ title: "Research Grants & Funding · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="grants" />,
});