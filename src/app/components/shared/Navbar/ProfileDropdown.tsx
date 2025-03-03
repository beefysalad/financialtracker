import { ROUTES } from "@/app/common/constants/route-pages";
import { APP_STRINGS } from "@/app/common/magic-strings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { getFirstLetter } from "@/lib/helper";
import Link from "next/link";

const ProfileDropdown = async () => {
  const session = await auth();

  const showProfileDropdown = () => {
    if (!session) return <></>;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='hover:cursor-pointer'>
            <AvatarImage src={session.user?.image ?? " "} />
            <AvatarFallback>
              {session.user?.name && getFirstLetter(session.user.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className='w-full' href={ROUTES.USER}>
              {APP_STRINGS.UI.PROFILE_DROPDOWN.PROFILE}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {APP_STRINGS.UI.PROFILE_DROPDOWN.SETTINGS}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  return showProfileDropdown();
};

export default ProfileDropdown;
