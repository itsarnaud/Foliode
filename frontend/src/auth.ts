import NextAuth     from "next-auth";
import GitHub       from "next-auth/providers/github";
import Dribbble     from "next-auth/providers/dribbble";
import axios        from 'axios';
import { cookies }  from 'next/headers'


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
          scope: 'read:user repo'
        }
      }
    }),
    Dribbble({
      clientId: process.env.AUTH_DRIBBBLE_ID,
      clientSecret: process.env.AUTH_DRIBBBLE_SECRET,
      authorization: {
        url: "https://dribbble.com/oauth/authorize",
        params: {
          scope: "public",
        },
      },
    })
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

          const cookieStore = await cookies();
          const authToken = cookieStore.get('token_auth')?.value;

          const headers: { 'Content-Type': string; 'Authorization'?: string } = {
            'Content-Type': 'application/json'
          };

          if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
          }

          if (token.provider === 'dribbble') {
            try {
              const response = await axios.post(
                `${process.env.API_CLIENT_URL}/api/user/auth/dribbble`,
                { 'dribbble_token': `${token.accessToken}` },
                { headers }
              );

              const cookieStore = await cookies();
              cookieStore.set({
                name: 'token_auth',
                value: response.data.token
              });
            } catch(error) {
              console.error('Erreur lors de l\'authentification de dribbble :', error);
            }
          } else if (token.provider === 'github') {
            try {
              const response = await axios.post(
                `${process.env.API_CLIENT_URL}/api/user/auth/github`,
                { 'github_token': `${token.accessToken}` },
                { headers }
              );
  
              const cookieStore = await cookies();
              cookieStore.set({
                name: 'token_auth',
                value: response.data.token
              });
            } catch(error) {
              console.error('Erreur lors de l\'authentification de github :', error);
            }
          }
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    }    
  }
});