import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true
    }),
  ],
  session: { strategy: "database" as const },
  callbacks: {
    session: async ({ session, user }: any) => {
      if (session?.user) (session.user as any).id = user.id;
      return session;
    },
  }
} as const;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
