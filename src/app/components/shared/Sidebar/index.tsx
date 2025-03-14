import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { isUserLoggedIn } from "@/lib/helper";
import NavUser from "./nav-user";
import { APP_STRINGS } from "@/app/common/magic-strings";

export async function AppSidebar() {
  const session = await auth();
  return (
    (await isUserLoggedIn()) && (
      <Sidebar collapsible='icon'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {APP_STRINGS.UI.SIDEBAR_MENU.map((item) => (
                  <SidebarMenuItem key={item.title} className='mt-4'>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a
                        href={item.url}
                        className='flex items-center gap-3 text-lg'
                      >
                        <item.icon className='scale-125' />
                        <span className='text-md'>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className='border-t border-sidebar-border'>
          {session && session.user && (
            <NavUser name={session.user.name!} image={session.user.image} />
          )}
        </SidebarFooter>
      </Sidebar>
    )
  );
}
