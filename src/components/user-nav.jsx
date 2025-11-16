import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoLogOutOutline, IoSettingsOutline, IoPersonOutline } from "react-icons/io5";

import { useAuth } from "../providers/UserContext";

export const UserNav = () => {
  const { user, logoutUser } = useAuth();
  const currentUser = user || JSON.parse(localStorage.getItem('user')) || {};

  function extractInitials(name) {
    const words = name?.split(" ");
    let initials = "";
    let count = 0;
    for (let i = 0; i < words?.length && count < 2; i++) {
      if (
        words[i].toLowerCase() !== "de" &&
        words[i].toLowerCase() !== "la" &&
        words[i].toLowerCase() !== "el" &&
        words[i].toLowerCase() !== "los" &&
        words[i].toLowerCase() !== "las"
      ) {
        initials += words[i][0].toUpperCase();
        count++;
      }
    }
    return initials;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://raw.githubusercontent.com/Yamada-decs/pictures/main/memes/wasaaaGatito.jpg" alt="User avatar" />
            <AvatarFallback>{extractInitials(currentUser.full_name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{currentUser.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild style={{ cursor: "pointer" }}>
            <Link to="/ajustes" className="flex items-center justify-between w-full">
              Perfil
              <DropdownMenuShortcut>
                <IoPersonOutline className="h-4 w-4" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          style={{ cursor: "pointer" }}
          onClick={() => logoutUser()}
        >
          Cerrar Sesión
          <DropdownMenuShortcut>
            <IoLogOutOutline className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild style={{ cursor: "pointer" }}>
          <Link to="/ajustes" className="flex items-center justify-between w-full">
            Ajustes
            <DropdownMenuShortcut>
              <IoSettingsOutline className="h-4 w-4" />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};