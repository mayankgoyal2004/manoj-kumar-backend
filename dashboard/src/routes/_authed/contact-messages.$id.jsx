import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/contact-messages/$id")({
  beforeLoad: () => {
    throw redirect({ to: "/contact-messages" });
  },
  component: () => null,
});
