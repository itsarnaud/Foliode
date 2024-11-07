import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

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
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect() {
      return "http://localhost:4200";  // Redirection vers le bon port en dur
      // TODO Trouver comment rediriger vers le bon port automatiquement, pas en dur
    },
    async jwt({ token, account }) {
      
      if (account && account.access_token) {
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