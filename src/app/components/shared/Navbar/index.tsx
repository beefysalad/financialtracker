import ProfileDropdown from "./ProfileDropdown";

export const Navbar = () => {
  return (
    <nav className='sticky top-0 left-0 w-full bg-background/80 backdrop-blur-lg border-b border-zinc-800 shadow-sm z-50'>
      <div className='flex items-center justify-between h-16 px-4'>
        <p className='text-xl font-bold  font-mono tracking-wider'>
          Budget Hive
        </p>
        <ProfileDropdown />
      </div>
    </nav>
  );
};
