import { LogOut, Monitor, Moon, Palette, Sun } from "lucide-react";

import { useSession } from "@/features/auth/model/use-session";
import {
  formatUserDisplayName,
  formatUserInitials,
  formatUserSubtitle,
} from "@/features/header/lib/format-user-display";
import { fetchQuery } from "@/shared/api/fetch";
import { type Theme, useTheme } from "@/shared/lib/hooks/use-theme.tsx";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Spinner } from "@/shared/ui/spinner";

export const User = () => {
  const { logout } = useSession();
  const { theme, setTheme } = useTheme();

  const { data: user, isPending } = fetchQuery.useQuery("get", "/user/me");

  const handleLogout = () => {
    logout();
  };

  const displayName = user ? formatUserDisplayName(user) : "Пользователь";
  const subtitle = user ? formatUserSubtitle(user) : "";
  const initials = user ? formatUserInitials(user) : "—";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-12 items-center gap-3 rounded-l-md p-0 pl-2 hover:bg-accent"
          type="button"
          variant="ghost"
        >
          <div className="flex flex-col text-right max-sm:hidden">
            <p className="max-w-40 truncate font-medium text-sm">
              {isPending ? "Загрузка…" : displayName}
            </p>
            {subtitle ? (
              <p className="max-w-40 truncate text-muted-foreground text-xs">
                {subtitle}
              </p>
            ) : null}
          </div>
          <Avatar className="size-11">
            <AvatarFallback className="text-xs">
              {isPending ? <Spinner className="size-4" /> : initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="size-4" />
            <span>Выбор темы</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              onValueChange={(value) => setTheme(value as Theme)}
              value={theme}
            >
              <DropdownMenuRadioItem value="light">
                <Sun className="size-4" />
                <span>Светлая</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                <Moon className="size-4" />
                <span>Темная</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                <Monitor className="size-4" />
                <span>Системная</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} variant="destructive">
          <LogOut className="size-4" />
          <span>Выход</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
