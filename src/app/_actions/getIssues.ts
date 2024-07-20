import { auth } from "@/auth"
import { prismaClient } from "@/lib/prisma"
import { cache } from "react"

export const getIssues = cache(async({id}: {
    id:string
}) => {

    const user = await auth();

    //@ts-ignore
    console.log(user?.user.tenant);
    
    const issues = await prismaClient.issue.findMany({
        where: {
            //@ts-ignore
            tenantId:user?.user.tenant.id,
            projectId:id,
            
        }
    })


    return issues;
})