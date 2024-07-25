'use server';

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { getSessionUser } from "./user";



export async function updateWorkplaceSlug(data:FormData) {

    const workPlacename = data.get('workplace') as string
    const size = data.get('size') as string
    const user = await getSessionUser()


    if(!user) throw new Error("You need to be authorized to make this action!");


        Promise.all([
            await prismaClient.tenant.update({
                where: {
                    id: user.tenantId
                },
                data: {
                    name:workPlacename,
                    teamSize:Number(size)
                }
            }),

            await prismaClient.user.update({
                where:{
                    id:user.id
                },
                data:{
                    isOnboarded:true
                }
            })
        ])
            
}