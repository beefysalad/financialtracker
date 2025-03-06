import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "./common/constants/route-pages";
import Dashboard from "./components/Dashboard";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }
  return <Dashboard />;
}
