'use server';

import { prismaClient } from "@/lib/prisma";
import { getUser } from "@/lib/user";



export const getProjects = async() => {
    const user = await getUser();
    const projects = await prismaClient.project.findMany({
        where: {
            tenantId:user?.tenant.id
        },
        include: {
            tenant:true
        }
    })
    return projects;
}