import { Link } from "@tanstack/react-router";
import { Tabs } from "./tabs";
import { User } from "./user";

export const Header = () => (
  <header className="sticky top-0 z-10 h-16 border-b bg-background">
    <nav className="flex h-full w-full items-center justify-between px-6 max-md:px-4">
      <div className="flex items-center gap-8">
        <Link className="font-bold text-xl hover:opacity-80" to="/">
          Ключи Москвы Админ
        </Link>

        <Tabs />
      </div>
      <div className="flex items-center gap-4">
        <User />
      </div>
    </nav>
  </header>
);
