'use client'

import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

/*
  Use this wrapper when you want to access a user's session within a client side component.
  This enables the use of `useSession` hook provided by `next-auth/react`.

  --- example ---

  const session = getServerAuthSession();

  return (
    <ClientSideSessionWrapper session={session}>
      <MyClientSideComponent/>
    </ClientSideSessionWrapper>
  );
*/

export default function ClientSideSessionWrapper({children, session}: {children: React.ReactNode , session: Session | null}) {
  return (  
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  );
}
