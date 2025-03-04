"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { useRef } from "react";

const HamburgerMenu = () => {
  const sidebarButtonRef = useRef<HTMLButtonElement>(null);

  const openSidebar = () => {
    if (sidebarButtonRef.current) {
      sidebarButtonRef.current.click();
    }
  };

  return (
    <>
      <SidebarTrigger ref={sidebarButtonRef} className='hidden' />

      <Menu className='cursor-pointer' onClick={openSidebar} />
    </>
  );
};

export default HamburgerMenu;
