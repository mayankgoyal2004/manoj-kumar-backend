import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/awards")({
  head: () => ({ meta: [{ title: "Awards & Recognitions · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="awards" />,
});