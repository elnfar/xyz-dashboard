import { auth } from "@/auth"
import { prismaClient } from "./prisma"
import { cache } from 'react'

export const session = async ({ session, token }: any) => {
  session.user.id = token.id
  session.user.tenant = token.tenant
  return session
}

export const getUserSession = cache(async() => {
    const authUserSession = await auth();
    if (!authUserSession) throw new Error('unauthorized')


    const user =  await prismaClient.user.findUnique({
      where: {
        id:authUserSession.user?.id,
        //@ts-ignore
        tenantId:authUserSession.user?.tenant.id
      },
      include:{
        tenant:true
      }
    
    })

    return user;
  
})