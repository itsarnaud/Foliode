import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const auth = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  // TODO   configurer la page de callback en cas de réussir
  // TODO   configurer la page d'erreur en cas d'erreur
  // }
});

export const { handlers, signIn, signOut } = auth;