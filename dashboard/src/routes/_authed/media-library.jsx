import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/media-library")({
  head: () => ({ meta: [{ title: "Media Library · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="media" />,
});