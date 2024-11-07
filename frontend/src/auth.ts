import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Dribbble from "next-auth/providers/dribbble";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user repo user:email'
        }
      }
    }),
    Dribbble({
      clientId: process.env.AUTH_DRIBBBLE_ID,
      clientSecret: process.env.AUTH_DRIBBBLE_SECRET,
      authorization: {
        params: {
          scope: "public",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect() {
      return "http://localhost:4200/dashboard/login"; 
      // TODO Trouver comment rediriger vers le bon port automatiquement, pas en dur
    },
    async jwt({ token, account }) {
      if (account) {
        console.log(account)
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      return session
    }
  }
});