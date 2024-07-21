'use server';

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";



export async function updateWorkplaceSlug(data:FormData) {

    const workPlacename = data.get('workplace') as string
    const size = data.get('size') as string
    const sessionUser = await auth();


    try {

            await prismaClient.tenant.update({
                where: {
        
                    //@ts-ignore
                    id: sessionUser?.user?.tenant.id
                },
                data: {
                    name:workPlacename,
                    teamSize:Number(size)
                }
            })
            await prismaClient.user.update({
                where:{
                    id:sessionUser?.user?.id
                },
                data:{
                    isOnboarded:true
                }
            })
            
        
    }catch(err) {
        return err;
    }
}