import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/education")({
  head: () => ({ meta: [{ title: "Education & Credentials · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="education" />,
});