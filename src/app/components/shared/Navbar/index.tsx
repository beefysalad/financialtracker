import { SidebarTrigger } from "@/components/ui/sidebar";
import { isUserLoggedIn } from "@/lib/helper";
import HamburgerMenu from "./hamburger";

export const Navbar = async () => {
  return (
    (await isUserLoggedIn()) && (
      <nav className='sticky top-0 left-0 w-full bg-background/80 backdrop-blur-lg border-b border-zinc-800 shadow-sm z-50'>
        <div className='flex items-center h-16 px-4'>
          {/* Left Section: SidebarTrigger + Title (Visible on Large Screens) */}
          <div className='flex items-center gap-4 flex-1'>
            <div className='hidden lg:block'>
              <SidebarTrigger />
            </div>
            <p className='text-xl font-bold font-mono tracking-wider'>
              Budget Hive
            </p>
          </div>

          {/* Right Section: Hamburger Menu (Visible on Mobile) */}
          <div className='lg:hidden'>
            <HamburgerMenu />
          </div>
        </div>
      </nav>
    )
  );
};
