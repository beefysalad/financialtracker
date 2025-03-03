import { Button } from "@/components/ui/button";
import { logOut } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "./common/constants/route-pages";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }
  return (
    <>
      <div>hello {session.user?.name}</div>
      <Button onClick={logOut} className='mt-5'>
        Sign out
      </Button>
    </>
  );
}
