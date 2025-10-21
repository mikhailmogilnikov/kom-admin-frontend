import { createFileRoute } from "@tanstack/react-router";

const DashboardComponent = () => (
  <div className="p-6">
    <h1 className="font-bold text-3xl">Dashboard</h1>
    <p className="mt-4 text-muted-foreground">
      Добро пожаловать в админ-панель Keys of Moscow
    </p>
  </div>
);

export const Route = createFileRoute("/_private/")({
  component: DashboardComponent,
});
