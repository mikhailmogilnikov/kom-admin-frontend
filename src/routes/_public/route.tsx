import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useSession } from "@/features/auth/model/use-session";

const PublicLayoutComponent = () => (
  <div className="flex min-h-screen flex-col">
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

export const Route = createFileRoute("/_public")({
  beforeLoad: () => {
    const isAuthenticated = useSession.getState().session !== null;
    if (isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: PublicLayoutComponent,
});
