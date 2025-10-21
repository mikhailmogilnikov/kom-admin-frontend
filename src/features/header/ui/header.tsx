import { Link, useNavigate } from "@tanstack/react-router";
import { useSession } from "@/features/auth/model/use-session";
import { Button } from "@/shared/ui/button";
import { Tabs } from "./tabs";

export const Header = () => {
  const { logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-10 h-16 border-b bg-background">
      <nav className="flex h-full w-full items-center justify-between px-6 max-md:px-4">
        <div className="flex items-center gap-8">
          <Link className="font-bold text-xl hover:opacity-80" to="/">
            Ключи Москвы Админ
          </Link>

          <Tabs />
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleLogout} variant="outline">
            Выход
          </Button>
        </div>
      </nav>
    </header>
  );
};
