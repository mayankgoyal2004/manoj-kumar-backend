import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/gallery")({
  head: () => ({ meta: [{ title: "Campus & Leadership Gallery · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="gallery" />,
});