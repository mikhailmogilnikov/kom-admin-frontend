import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/shared/ui/header";

const LayoutComponent = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});
