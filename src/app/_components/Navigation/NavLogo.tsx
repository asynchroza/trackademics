"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/trpc/react";

export const NavLogo = () => {
  // TODO: Convert to server side component
  const { data: session } = useSession();
  const { data: organization } = api.organization.getOrganization.useQuery({
    id: session?.user.organizationId ?? "",
  });

  if (organization?.image) {
    return (
      <Image
        src={organization.image}
        alt="Organization Logo"
        width={30}
        height={30}
      />
    );
  }

  return null;
};
