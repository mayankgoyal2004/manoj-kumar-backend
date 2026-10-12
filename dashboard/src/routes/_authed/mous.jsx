import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/mous")({
  head: () => ({ meta: [{ title: "MoUs & Strategic Alliances · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="mous" />,
});