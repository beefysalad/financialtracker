"use client";
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
import { getFirstLetter } from "@/lib/helper";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProfileDropdown = () => {
  const { data: session } = useSession();
  const handleClick = (text: string, location: string) => {
    // if value is logout then it should call the logout function
    if (text === APP_STRINGS.UI.PROFILE_DROPDOWN[2].text) {
      logOut();
    } else {
      redirect(location);
    }
  };
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
          {APP_STRINGS.UI.PROFILE_DROPDOWN.map((item, idx) => (
            <DropdownMenuItem
              key={idx}
              onClick={() => handleClick(item.text, item.location)}
            >
              <Link className='w-full' href={item.location}>
                {item.text}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  return showProfileDropdown();
};

export default ProfileDropdown;
