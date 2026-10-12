import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/positions")({
  head: () => ({ meta: [{ title: "Academic & Executive Positions · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="positions" />,
});