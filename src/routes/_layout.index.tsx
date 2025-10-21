import { createFileRoute } from "@tanstack/react-router";

const IndexComponent = () => (
  <div className="container mx-auto px-4 py-8">
    <h2 className="mb-4 font-bold text-2xl">Главная страница</h2>
    <p>Добро пожаловать в панель администратора КОМ</p>
  </div>
);

export const Route = createFileRoute("/_layout/")({
  component: IndexComponent,
});
