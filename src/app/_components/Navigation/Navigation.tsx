import { getServerAuthSession } from "~/server/auth";
import { MainNavigation } from "./MainNavigation";
import ClientSideSessionWrapper from "~/app/_components/Utilities/ClientSideSessionWrapper";
import { UserNavigation } from "./UserNavigation";
import { NavLogo } from "./NavLogo";

export default async function Navigation() {
  const session = await getServerAuthSession();

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNavigation className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ClientSideSessionWrapper session={session}>
              <NavLogo />
              <UserNavigation />
            </ClientSideSessionWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
