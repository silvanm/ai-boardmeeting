import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { verifyMagicLinkToken } from "./magic-link";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      id: "magic-link",
      name: "Magic Link",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const token = credentials?.token;
        if (typeof token !== "string" || !token) return null;
        try {
          const payload = await verifyMagicLinkToken(token);
          return {
            id: `guest-${Date.now()}`,
            name: payload.name,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email?.endsWith("@muehlemann-popp.ch") ?? false;
      }
      if (account?.provider === "magic-link") {
        return true;
      }
      return false;
    },
    jwt({ token, account }) {
      if (account) {
        token.authType = account.provider === "magic-link" ? "magic-link" : "google";
      }
      return token;
    },
    session({ session, token }) {
      if (token.authType) {
        (session as unknown as Record<string, unknown>).authType = token.authType;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
