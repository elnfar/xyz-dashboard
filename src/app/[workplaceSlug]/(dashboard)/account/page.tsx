import { auth } from '@/auth'
import { Button } from '@/components/ui/button';
import { prismaClient } from '@/lib/prisma';
import { Idle } from '@prisma/client';
import React from 'react'
import IdleSelect from './IdleSelect';
import { ActivityDuration } from './duration';
import { revalidatePath } from 'next/cache';




export default async function page() {
  const user = await auth();

  // @ts-ignore
  if (!user.user.id || !user.user.tenant.id) {
    throw new Error('User or tenant information is missing');
  }

  async function upsertWorking(data:FormData) {
    'use server';

    if(!user?.user?.id) {
      throw new Error('User or tenant information is missing');
    }

    await prismaClient.activity.create({
      data: {
        userId: user.user.id,
        // @ts-ignore
        tenantId: user?.user?.tenant.id,
        idle: Idle.NOT_WORKING,
        startTime: new Date(),
      }
    })

    revalidatePath('/account')
  }

  async function stopWorking(data:FormData) {
    'use server';

    if(!user?.user?.id) {
      throw new Error('User or tenant information is missing');
    }


      const ongoingActivity = await prismaClient.activity.findFirst({
        where: {
          userId: user!.user!.id,
          endTime: null,
        },
      });
  
  
      await prismaClient.activity.updateMany({
        where: {
          id:ongoingActivity?.id
        },
        data: {
          endTime: new Date()
        }
      })

      revalidatePath('/account')
  
  }




 const userIdleActivity = await prismaClient.activity.findFirst({
    where: {
      userId:user?.user?.id,
      endTime: null,
    }
 })

  

  return (
    <div className='px-4 py-12'>

      {/* {!userIdleActivity?.startTime && ( */}
        <form action={userIdleActivity? stopWorking : upsertWorking}>
            <Button variant="outline" className='text-white' type='submit'>{userIdleActivity ? "Stop shift" : "Start shift"} </Button>
        </form>
      {/* )} */}
        
        <div>
          <IdleSelect userIdleActivity={userIdleActivity!}/>
        </div>


        {!!userIdleActivity?.startTime && (
          <ActivityDuration startAt={userIdleActivity?.startTime}/>
        )}
        

    </div>
  )
}


