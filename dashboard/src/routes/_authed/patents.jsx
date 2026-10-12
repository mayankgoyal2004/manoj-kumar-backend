import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/patents")({
  head: () => ({ meta: [{ title: "Patents & Intellectual Property · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="patents" />,
});