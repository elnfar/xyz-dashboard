'use server'

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { Idle } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function upsertActivity(data:FormData) {
    'use server'
    const user = await auth();
    const newIdle = data.get('activity') as Idle;

      // @ts-ignore
      if (!user?.user?.id || !user?.user?.tenant?.id) {
        throw new Error('User or tenant information is missing');
      }
  
    
    await prismaClient.activity.updateMany({
      where: {
        userId: user.user.id,
        endTime: null,
      },
      data: {
        endTime: new Date(),
      },
    });

    await prismaClient.activity.create({
      data: {
        userId: user.user.id,
        // @ts-ignore
        tenantId: user.user.tenant.id,
        idle: newIdle,
        startTime: new Date(),
      },
    });

    revalidatePath('/account');
  }
