'use server'

import { prismaClient } from "@/lib/prisma";
import { ProjectSchema } from "@/lib/project.type";
import { getSessionUser } from "./user";





export default async function createProject(data:FormData) {
    const user = await getSessionUser();


    const validatedFields = ProjectSchema.safeParse({
      name:data.get('name') as string,
      industry:data.get('industry') as string
    })

    console.log(validatedFields);
    

    if(!validatedFields.success) {
      console.log('ERR');
      
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    

      await prismaClient.project.create({
        data: {
          name:validatedFields.data.name,
          industry:validatedFields.data.industry,
          tenant:{
            connect:user?.tenant
          }
        }
      })  
}
