import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";

export const NavLogo = async () => {
  const session = await getServerAuthSession();

  if (session?.user.organizationImage) {
    return (
      <Image
        src={session.user.organizationImage}
        alt={`Organization logo`}
        width={30}
        height={30}
      />
    );
  }

  return null;
};
