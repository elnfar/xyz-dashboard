'use server';

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { cache } from "react";



export const getTeamMembers = cache(async() => {

    const user = await auth();
        
    const users = await prismaClient.user.findMany({
        where: {
            //@ts-ignore
            tenantId: user?.user?.tenant.id
        },
    })

    return users;
      

})