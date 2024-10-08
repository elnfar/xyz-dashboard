import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { cookies } from "next/headers";
import { prismaClient } from "./lib/prisma";

  export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
  } = NextAuth({
    trustHost: true,
    adapter: PrismaAdapter(prismaClient),
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
      authorized: async ({ auth }) => {
        // Logged in users are authenticated, otherwise redirect to login page
        return !!auth
      },
      async  signIn({account,profile}) {
        if (!profile?.email) {
          throw new Error('No profile')
        }

        const inviteKey = cookies().get('invite_key')?.value
        await prismaClient.user.upsert({
          where: {
            email:profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
            role: inviteKey ? 'USER' : 'OWNER',
            image:profile.picture,
            isOnboarded:inviteKey ? true : false,
            tenant: inviteKey
            ? {
                connect: {
                  inviteKey,
                }
              }
            : {
                create: {}
              }          
        },

        
        update: {
          name: profile.name,
        }
        })
        cookies().delete('invite_key')
        return true

      },
      async jwt({ token, user, account, profile }) {

        if (profile) {
          const user = await prismaClient.user.findUnique({
            where: {
              email:profile.email || ''
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
    secret: process.env.NEXTAUTH_SECRET || '+ARomkQ0SCb6a4YALJZ0hjxnXG680oenSua0EXMVqDg=',
    debug:true,
  })

