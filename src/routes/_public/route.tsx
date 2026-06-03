import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const PublicLayoutComponent = () => (
  <div className="flex min-h-screen flex-col">
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

export const Route = createFileRoute("/_public")({
  beforeLoad: ({ context: { session } }) => {
    if (session) {
      throw redirect({ to: "/" });
    }
  },
  component: PublicLayoutComponent,
});
