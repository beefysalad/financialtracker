import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const CustomSidebarProvider = async ({ children }: Props) => {
  const session = await auth();
  const open = !!session;
  return <SidebarProvider open={open}>{children}</SidebarProvider>;
};

export default CustomSidebarProvider;
