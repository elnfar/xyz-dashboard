
import { Sidebar } from "@/components/global/sidebar";
import { ReactNode } from "react";
import { getSessionUser } from "@/app/_actions/user";
import dynamic from "next/dynamic";
import { getProjects } from "@/app/_actions/getProjects";
import Providers from "@/components/providers/progress-provider";

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
    title: `${user?.tenant.name} - Home`, 
  }
}

export default async function DashboardLayout({children, params}:{
    children:ReactNode,
    params: { workplaceSlug: string };
}) {

  const { workplaceSlug } = params

  const user = await getSessionUser();
  const projects = await getProjects()

 
  return (
    <Providers>      
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
      </Providers> 
  )
  }