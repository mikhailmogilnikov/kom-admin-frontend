import { createFileRoute } from "@tanstack/react-router";

const UsersComponent = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="font-bold text-3xl">Пользователи</h1>
    <p className="mt-4 text-muted-foreground">
      Управление пользователями системы
    </p>
  </div>
);

export const Route = createFileRoute("/_private/users")({
  component: UsersComponent,
});
