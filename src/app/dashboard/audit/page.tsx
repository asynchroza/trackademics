import { getServerAuthSession } from "~/server/auth";

export default async function Audit() {
  const session = await getServerAuthSession();

  return <h1>{session?.user.name}</h1>;
}
