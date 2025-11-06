import NextAuth, { type AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// If you already have a prisma client helper, import that instead.
const prisma = new PrismaClient();

// IMPORTANT: providers must be mutable (Provider[]), NOT a readonly tuple.
const providers: Provider[] = [
  GitHubProvider({
    clientId: process.env.GITHUB_ID ?? "",
    clientSecret: process.env.GITHUB_SECRET ?? "",
  }),
];

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: { strategy: "database" },
  callbacks: {
    // keep or add any callbacks you had before
    // async session({ session, user }) { return session; },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
