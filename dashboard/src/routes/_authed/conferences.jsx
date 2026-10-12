import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/conferences")({
  head: () => ({ meta: [{ title: "Conferences & Keynotes · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="conferences" />,
});