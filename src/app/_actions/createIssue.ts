'use server';

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { IssueCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Cateogry = {
    NEW:'NEW',
    IN_PROGRESS:'IN_PROGRESS',
    DONE:'DONE'
}


export default async function createIssue(data:FormData) {


    const user = await auth();

    if(!user) return "User must be exist to create an issue";

    const title = data.get('title') as string;
    const description  = data.get('description') as string;
    const projectId = data.get('projectId') as string;
    const assignedUser = data.get('userId') as string;



    await prismaClient.issue.create({
        data:{
            title,
            description,
            category:IssueCategory.NEW,
            projectId,
            assignees: {
                create: {
                    user: {
                        connect: {
                            id: assignedUser
                        }
                    }
                }
            },

            //@ts-ignore
            tenantId: user?.user?.tenant.id,
        }
    })

    revalidatePath(`/projects/${projectId}`)

}