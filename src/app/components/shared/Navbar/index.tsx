import { SidebarTrigger } from "@/components/ui/sidebar";
import { isUserLoggedIn } from "@/lib/helper";

export const Navbar = async () => {
  return (
    (await isUserLoggedIn()) && (
      <nav className='sticky top-0 left-0 w-full bg-background/80 backdrop-blur-lg border-b border-zinc-800 shadow-sm z-50'>
        <div className='flex items-center h-16 px-4'>
          <SidebarTrigger />
          <p className='text-xl font-bold  font-mono tracking-wider'>
            Budget Hive
          </p>
        </div>
      </nav>
    )
  );
};
