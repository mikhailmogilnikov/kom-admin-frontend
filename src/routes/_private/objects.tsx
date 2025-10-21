import { createFileRoute } from "@tanstack/react-router";

const ObjectsComponent = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="font-bold text-3xl">Объекты</h1>
    <p className="mt-4 text-muted-foreground">
      Управление объектами и недвижимостью
    </p>
  </div>
);

export const Route = createFileRoute("/_private/objects")({
  component: ObjectsComponent,
});
