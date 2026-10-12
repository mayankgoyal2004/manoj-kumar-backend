import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/affiliations")({
  head: () => ({ meta: [{ title: "Affiliations & Governance · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="affiliations" />,
});