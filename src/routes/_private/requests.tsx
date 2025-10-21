import { createFileRoute } from "@tanstack/react-router";

const RequestsComponent = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="font-bold text-3xl">Заявки</h1>
    <p className="mt-4 text-muted-foreground">
      Управление заявками пользователей
    </p>
  </div>
);

export const Route = createFileRoute("/_private/requests")({
  component: RequestsComponent,
});
