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

    if(!authUserSession) return

    console.log(authUserSession);
    


    const user = await prismaClient.user.findUnique({
      where: {
        email:authUserSession?.user?.email as string
      },
      include:{
        tenant:true
      }
    })
  

    return user;
  
})