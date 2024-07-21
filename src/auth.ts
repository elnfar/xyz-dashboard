import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
      allowDangerousEmailAccountLinking:true
    }),
  ],
  callbacks: {
    authorized({auth,request:{nextUrl}}) {
      const isLoggedIn = !!auth?.user;
      const isOnlogin = nextUrl.pathname.startsWith('/');

      if(isOnlogin) {
        if(isLoggedIn) return true;
        return false;
      }else if (isLoggedIn) {
        return Response.redirect(new URL('/onboarding', nextUrl));
      }
      return true;
    },
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
              create: {}
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
  },
  pages: {
    signIn:'/'
  },
})

