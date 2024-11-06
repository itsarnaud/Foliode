import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect() {
      return "http://localhost:4200";  // Redirection vers le bon port en dur
      // TODO Trouver comment rediriger vers le bon port automatiquement, pas en dur
    },
  }
});