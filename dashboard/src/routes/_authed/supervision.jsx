import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/supervision")({
  head: () => ({ meta: [{ title: "PhD Supervision & Mentorship · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="supervision" />,
});