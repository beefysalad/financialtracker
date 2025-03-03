import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

const SidebarTriggerCustom = async () => {
  const session = await auth();

  return session ? (
    <div className='flex justify-start px-4 py-2'>
      <SidebarTrigger />
    </div>
  ) : null;
};

export default SidebarTriggerCustom;
