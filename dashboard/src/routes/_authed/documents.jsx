import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/documents")({
  head: () => ({ meta: [{ title: "Document Management · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="documents" />,
});