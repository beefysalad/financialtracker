"use client";
import { APP_STRINGS } from "@/app/common/magic-strings";
import { useSessionStore } from "@/app/store/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface IUser {
  name: string;
  image?: string | null;
}
const NavUser = ({ name, image }: IUser) => {
  const router = useRouter();
  const { removeSession } = useSessionStore();
  const handleClick = (text: string, location: string) => {
    // if value is logout then it should call the logout function
    if (text === APP_STRINGS.UI.PROFILE_DROPDOWN[2].text) {
      removeSession();
      logOut();
    } else {
      router.push(location);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-auto w-full justify-start px-2 py-1.5 flex items-center gap-2 transition-all duration-300 group-data-[collapsible=icon]:justify-center'
        >
          <Avatar className='h-8 w-8'>
            <AvatarImage src={image ?? " "} alt={name} />
            <AvatarFallback>{getFirstLetter(name)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-start text-left transition-all duration-300 min-w-0 overflow-hidden group-data-[collapsible=icon]:hidden'>
            <span className='truncate text-sm font-medium leading-none'>
              {name}
            </span>
          </div>
          <ChevronUp className='ml-auto transition-all duration-300 group-data-[collapsible=icon]:hidden' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {APP_STRINGS.UI.PROFILE_DROPDOWN.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleClick(item.text, item.location)}
          >
            <item.icon className='mr-2 h-4 w-4' />
            <span>{item.text}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
