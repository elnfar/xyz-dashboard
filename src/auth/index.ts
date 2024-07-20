import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { cookies } from "next/headers";

const prisma = new PrismaClient();


export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
      allowDangerousEmailAccountLinking:true
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async  signIn({account,profile}) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      const inviteKey = cookies().get('invite_key')?.value
      await prisma.user.upsert({
        where: {
          email: profile.email
        },
        create: {
          email: profile.email,
          name: profile.name,
          role: inviteKey ? 'USER' : 'OWNER',
          tenant: inviteKey
          ? {
              connect: {
                inviteKey
              }
            }
          : {
              create: {
                name:profile.name + '"s team'
              }
            }

        // },
        
      },
      update: {
        name: profile.name,
      }
      })
      cookies().delete('invite_key')
      return true

    },
    async jwt({ token, user, account, profile }) {
      console.log({ token, account, profile, user })
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email || ''
          }
        })
        if (!user) {
          throw new Error('No user found')
        }
        token.id = user.id
        token.tenant = {
          id: user.tenantId
        }
      }
      return token
    },
    async session({ session, token }:{
      session:any,
      token:any
    }) {

      //@ts-ignore
      session.user.id = token.id;

      session.user.tenant = token.tenant
      return session;
    },
  },

  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);