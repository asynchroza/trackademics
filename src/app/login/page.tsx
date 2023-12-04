import { getServerAuthSession } from "~/server/auth";
import Login from "../_components/Login/Login";
import { redirect } from "next/navigation";
import { NAVIGATION_PATHS } from "../_constants/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect(NAVIGATION_PATHS.DASHBOARD_HOME);
  }

  return <Login />;
}
