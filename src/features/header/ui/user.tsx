import { useNavigate } from "@tanstack/react-router";
import { LogOut, Monitor, Moon, Palette, Sun } from "lucide-react";
import { useSession } from "@/features/auth/model/use-session";
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

export const User = () => {
  const { logout } = useSession();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-12 items-center gap-3 rounded-l-md p-0 pl-2 hover:bg-accent"
          variant="ghost"
        >
          <div className="flex flex-col text-right max-sm:hidden">
            <p>Ренат</p>
            <p className="text-muted-foreground text-xs">admin@example.com</p>
          </div>
          <Avatar className="size-11">
            <AvatarFallback className="text-xs">РМ</AvatarFallback>
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
