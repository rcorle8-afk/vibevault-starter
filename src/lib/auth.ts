import NextAuth, { type AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/db/prisma"; // adjust this import if your prisma client path differs

// IMPORTANT: Do NOT use `as const` or `satisfies` here.
// We want a mutable providers array (Provider[]), not a readonly tuple.
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    // keep whatever callbacks you already had, or leave empty
    // async session({ session, user }) { return session }
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// test commit
