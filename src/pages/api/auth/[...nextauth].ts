//@ts-nocheck
import NextAuth, { type NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/credentials-signin"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username: email, password } = credentials

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user) return null

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return null

        return user
      }
    }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    async jwt(param) {
      console.log('param', param)
      console.log('user', param.user)
      console.log('token', param.token)
      if (param.user) {
        param.token.id = param.user.id
      }
      return param.token
    },
    async session({ session, token }) {
      console.log('tokenss', token)
      console.log('session', session)
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
  session: {
    strategy: "jwt"
  },
  secret: env.JWT_SECRET,
};

export default NextAuth(authOptions);
