import { getServerAuthSession } from "~/server/auth";
import Login from "../_components/Login/Login";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return <Login />;
}
