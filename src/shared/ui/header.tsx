import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link className="font-bold text-xl hover:opacity-80" to="/">
              КОМ Админ
            </Link>
            {/* Здесь можно добавить дополнительные навигационные ссылки */}
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="rounded-md border px-4 py-2 hover:bg-accent"
              to="/login"
            >
              Выход
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
