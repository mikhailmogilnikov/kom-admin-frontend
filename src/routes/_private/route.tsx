import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useSession } from "@/features/auth/model/use-session";
import { Header } from "@/features/header/ui/header";

const PrivateLayoutComponent = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

export const Route = createFileRoute("/_private")({
  beforeLoad: () => {
    const isAuthenticated = useSession.getState().session !== null;

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: PrivateLayoutComponent,
});
