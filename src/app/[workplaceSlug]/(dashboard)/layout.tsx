import { auth } from '@/auth'
import { Sidebar } from '@/components/global/sidebar'

import { prismaClient } from '@/lib/prisma';
import React, { ReactNode } from 'react'
import { CardWithForm } from './projects/_components/dialog';
import Modal from '@/components/global/modal';
import { getUserSession } from '@/lib/auth';



export async function generateMetadata({ params }:{
  params:string
}) {

  const user = await getUserSession();



  return {
    title: `${user?.tenant.name} - Home`, 
  }
}

export default async function DashboardLayout({children, params}:{
    children:ReactNode,
    params: { workplaceSlug: string };
}) {

  const { workplaceSlug } = params




  const session = await auth();

  const userIdleActivity = await prismaClient.activity.findFirst({
    where: {
      userId: session?.user?.id,
      endTime: null,
    },
    select:{
      idle:true
    }
 })

 const projects = await prismaClient.project.findMany({
  where: {
    //@ts-ignore
    tenantId:session?.user?.tenant.id
  }
 })


 const user = await getUserSession();

    //  if(user?.isOnboarded === true) {
    //     redirect(`/${user.tenant.name}/dashboard`);
    // }


 


  return (
    <div className=' bg-[rgb(25,25,25)]'>
      <div className='flex justify-between'>
        <div className='overflow-y-scroll h-screen w-24'>
          <Sidebar workplaceSlug={workplaceSlug} session={session!} idle={userIdleActivity?.idle!}/>
        </div>
        
          <div className='h-screen w-full px-4'>
            <Modal
            title='New project'
            disabled
            projects={projects}
            body={<CardWithForm/>}
            />
            {children}
          </div>
      </div>
    </div>
  )
}


