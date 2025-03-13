import NextAuth from "next-auth"
import GitHub   from "next-auth/providers/github"
import Dribbble from "next-auth/providers/dribbble"
import axios    from "axios"

import { cookies }    from "next/headers"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Dribbble({ scope: 'public' })],
  
  pages: {
    error: '/login'
  },
  callbacks: {
    async redirect() {
      return `/dashboard`;
    },

    async jwt({ token, account }) {

      const data      = { provider: account?.provider, accessToken: account?.access_token, email: token.email };
      const headers   = { 'Content-Type': 'application/json', 'Authorization': '' };
      const cookie    = cookies();
      const authToken = cookie.get('token_auth')?.value;

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
      }

      if (data.provider && data.accessToken) {
        try {
          const res = await axios.post(
            `${process.env.API_CLIENT_URL}/api/user/auth/${data.provider}`,
            { 'token': data.accessToken, 'email': data.email },
            { headers }
          );
          const cookie = await cookies();
          cookie.set({ name: 'token_auth', value: `${res.data.token}` })
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.data?.error) {
            const errorMessage = error.response.data.error;

            const cookie = await cookies();
            cookie.set({ name: 'error', value: `${errorMessage}`, path: '/', maxAge: 60 })
          }
        }
      }

      return token;
    }
  }
})