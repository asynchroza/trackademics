import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { getFirstSubdomainFromHeaders } from "~/app/_utils/url";

// TODO: Extend JWT and Session to include the user's unique ID
declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    id: string;
    organizationId: string;
    organizationImage: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      id: string;
      organizationId: string;
      organizationImage: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    id: string;
    organizationId: string;
  }
}

import { env } from "~/env.mjs";
import { db } from "~/server/db";

const providers = [];

if (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET) {
  providers.push(
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  );
}

providers.push(
  CredentialsProvider({
    name: "password",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const user = await db.user.findUnique({
        where: {
          username: credentials?.username,
        },
      });

      // TODO: Password should be stored as hash
      if (
        user &&
        user.password == credentials?.password &&
        user.organizationId === getFirstSubdomainFromHeaders()
      ) {
        return user;
      }

      return null;
    },
  }),
);

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    redirect: async ({ url }) => {
      // keep this callback, otherwise logout always resolves to NEXTAUTH_URL
      return Promise.resolve(url);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const organization = await db.organization.findUnique({
          where: {
            id: user.organizationId,
          },
          select: {
            image: true,
          },
        });

        token.username = user.username;
        token.id = user.id;
        token.organizationId = user.organizationId;
        token.organizationImage = organization?.image ?? "";
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.id = token.id;
        session.user.organizationId = token.organizationId;
        session.user.organizationImage = token.organizationImage;
      }

      // session.user.image = token.user.image;
      return Promise.resolve(session);
    },
  },
  adapter: PrismaAdapter(db),
  providers,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
