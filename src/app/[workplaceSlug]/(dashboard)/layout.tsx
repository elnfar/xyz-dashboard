
import { Sidebar } from "@/components/global/sidebar";
import { ReactNode } from "react";
import { prismaClient } from "@/lib/prisma";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import AuthenticationWrapper from "@/lib/wrappers/auth-wrapper";
import Providers from "@/components/providers/progress-provider";
import { EPageTypes } from "@/lib/utils";
import { getSessionUser } from "@/app/_actions/user";
import dynamic from "next/dynamic";
import { getProjects } from "@/app/_actions/getProjects";
import { SWRConfig } from "swr";
import { Provider } from "@/app/provider";
import { storesContext } from ".."; 
import MobXProvider from "../provider";


const Modal = dynamic(() => import('@/components/global/modal'), {
  ssr: false,
});

const CardWithForm = dynamic(() => import('@/components/global/CardWithForm').then(mod => mod.CardWithForm), {
  ssr: false,
});

export async function generateMetadata({ params }:{
  params:string
}) {

  const user = await getSessionUser();


  return {
    title: `${user?.tenant.name} - ${params}`, 
  }
}

export default async function DashboardLayout({children, params}:{
    children:ReactNode,
    params: { workplaceSlug: string };
}) {

  const { workplaceSlug } = params

  const user = await getSessionUser();
  const projects = await getProjects()

//   const userIdleActivity = await prismaClient.activity.findFirst({
//     where: {
//       userId: user?.id,
//       endTime: null,
//     },
//     select:{
//       idle:true
//     }
//  })

 

 
  return (
    // <AuthenticationWrapper user={user} prop={{pageType:EPageTypes.AUTHENTICATED}}>  
  <MobXProvider>
    <Provider>
      <div className=' bg-[rgb(25,25,25)]'>
        <div className='flex justify-between'>
          <div className='overflow-y-scroll h-screen w-24'>
            <Sidebar user={user!} workplaceSlug={workplaceSlug}/>
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
     {/* </AuthenticationWrapper> */}
    </Provider>
    </MobXProvider>
  )
  }