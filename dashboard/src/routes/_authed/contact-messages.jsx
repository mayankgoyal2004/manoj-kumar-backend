import { createFileRoute } from "@tanstack/react-router";
import ResourcePage from "@/components/modules/ResourcePage";

export const Route = createFileRoute("/_authed/contact-messages")({
  head: () => ({ meta: [{ title: "Contact Messages · Portfolio Console" }] }),
  component: () => <ResourcePage moduleKey="contact-messages" />,
});
