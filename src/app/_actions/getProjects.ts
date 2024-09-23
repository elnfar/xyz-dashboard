'use server';

import { prismaClient } from "@/lib/prisma";
import { getSessionUser } from "./user";
import { cache } from "react";



export const getProjects = cache(async() => {
    const user = await getSessionUser();
    const projects = await prismaClient.project.findMany({
        where: {
            tenantId:user?.tenantId
        },
        include: {
            tenant:true,
        },
        cacheStrategy:{
            ttl:30
        }
    })
    return projects;
})