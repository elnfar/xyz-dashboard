'use server'

import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient().$extends(withAccelerate())

export default async function updateIssue(data: FormData) {
    console.log('issue', data)
    const user = await auth();

    if(!user) return "User must be exist"


    const issueId = data.get('issueId') as string
    const category = data.get('category') as string

    const issue = await prisma.issue.update({
    
        where: {
        id:issueId
    },
      data: {
        //@ts-ignore
        category:category
      }
    })
    
    revalidatePath(`/projects/${issueId}}`)
  }
