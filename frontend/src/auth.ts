import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import Dribbble from "next-auth/providers/dribbble";

declare module "next-auth" {
  interface Session {
    provider?: string;
    accessToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user'
        }
      }
    }),
    // Dribbble({
    //   clientId: process.env.AUTH_DRIBBBLE_ID,
    //   clientSecret: process.env.AUTH_DRIBBBLE_SECRET,
    //   authorization: {
    //     url: "https://dribbble.com/oauth/authorize",
    //     params: {
    //       scope: "public",
    //     },
    //     token: {
    //       url: "https://dribbble.com/oauth/token",
    //     },
    //     userinfo: {
    //       url: "https://api.dribbble.com/v2/user",
    //     }
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}`;
    },
    async jwt({ token, account }) {
      try {
        if (account) {
          token.accessToken = account.access_token;
          token.provider = account.provider;
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      return session;
    }
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});