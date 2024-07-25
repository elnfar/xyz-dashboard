'use server'

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { Idle } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "./user";


export async function upsertActivity(data:FormData) {
    
    const user = await getSessionUser();
    const newIdle = data.get('activity') as Idle;

      // @ts-ignore
      if (!user) {
        throw new Error('User or tenant information is missing');
      }
  
    
    await prismaClient.activity.updateMany({
      where: {
        userId: user.id,
        endTime: null,
      },
      data: {
        endTime: new Date(),
      },
    });

    await prismaClient.activity.create({
      data: {
        userId: user.id,
        // @ts-ignore
        tenantId: user.user.tenant.id,
        idle: newIdle,
        startTime: new Date(),
      },
    });

    revalidatePath('/account');
  }
