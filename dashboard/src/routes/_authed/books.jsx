import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/books")({
  head: () => ({ meta: [{ title: "Books Authored & Chapters · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="books" />,
});