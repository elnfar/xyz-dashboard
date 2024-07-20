'use server';

import { getUserSession } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { cache } from "react";



export const getProjects = cache(async() => {


  const user = await getUserSession()

  console.log(user);
  
  
  const projects = await prismaClient.project.findMany({
    where: {
      //@ts-ignore
      tenantId: user?.tenant.id
    },
    include:{
        tenant:true
    }
  })

  return projects;

})

export const singleProject = cache(async(params: {
    id: string;
}) => {
    const user = await getUserSession();

    const singleProejct =  await prismaClient.project.findUnique({
        where: {
          //@ts-ignore
          tenantId: user.tenant.id,
          id:params.id
        }
      })
    return singleProejct;
})