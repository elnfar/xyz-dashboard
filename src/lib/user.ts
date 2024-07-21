import { auth } from "@/auth"
import { prismaClient } from "./prisma";

export const getUser = async() => {
    const session = await auth();

    console.log(session);
    
    const user = await prismaClient.user.findUnique({
        where: {
            email:session?.user?.email || ''
        },
        include:{
            tenant:true
        }
    })
    return user;
}