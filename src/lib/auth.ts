import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma"
import { Adapter } from "next-auth/adapters"
import GitHub from "next-auth/providers/github"
import Google from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getDemoUser } from "@/app/(public)/_data_acess/get-demo-login"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  trustHost: true,
  providers: [GitHub, Google, CredentialsProvider({
    name: "Demo",
    credentials: {
      demo: { label: "Demo login", type: "hidden" }
    },
    async authorize(credentials, req){

      if(credentials?.demo === "true"){

        const user = await getDemoUser();

        if(!user){
          return null
        }

        return user;
      }

      return null
    }
  })],
  session: { 
    strategy: "jwt",
  },
  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.id = typeof user.id === "string" ? user.id : String(user.id ?? "");
      }
      return token;
    },

    async session({ session, token, user }) {

      session.user = { ...session.user, id: token.id } as any;

      return session;
    }
  }
})