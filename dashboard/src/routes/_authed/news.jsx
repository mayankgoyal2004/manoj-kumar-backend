import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/news")({
  head: () => ({ meta: [{ title: "News & Media Coverage · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="news" />,
});