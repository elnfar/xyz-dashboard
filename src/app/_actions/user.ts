'use server'
import { auth, currentUser } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"

const client = new PrismaClient();

export const getSessionUser = async () => {


    try
     {

    
    const user = await currentUser()

    if(!user) {
        return
    }
}catch(err) {
    return err
}

  }