
import Modal from "@/components/global/modal";
import { Sidebar } from "@/components/global/sidebar";
import { ReactNode } from "react";
import { CardWithForm } from "./projects/_components/dialog";
import { getUser } from "@/lib/user";
import { prismaClient } from "@/lib/prisma";
import { auth } from "@/auth";



export async function generateMetadata({ params }:{
  params:string
}) {

  const user = await getUser();

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
 const user = await getUser();

 
 const projects = await prismaClient.project.findMany({
  where: {
    //@ts-ignore
    tenantId:user?.tenant.id
  }
 })
 

 
  return (
    <div className=' bg-[rgb(25,25,25)]'>
      <div className='flex justify-between'>
        <div className='overflow-y-scroll h-screen w-24'>
          <Sidebar user={user!} workplaceSlug={workplaceSlug} idle={userIdleActivity?.idle!}/>
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

//   const { workplaceSlug } = params
//   const user = await getUserSession();



//   const userIdleActivity = await prismaClient.activity.findFirst({
//     where: {
//       userId: user?.id,
//       endTime: null,
//     },
//     select:{
//       idle:true
//     }
//  })

//  const projects = await prismaClient.project.findMany({
//   where: {
//     //@ts-ignore
//     tenantId:user?.tenant.id
//   }
//  })



//     //  if(user?.isOnboarded === true) {
//     //     redirect(`/${user.tenant.name}/dashboard`);
//     // }


 


//   return (
//     <div className=' bg-[rgb(25,25,25)]'>
//       <div className='flex justify-between'>
//         <div className='overflow-y-scroll h-screen w-24'>
//           <Sidebar workplaceSlug={workplaceSlug} user={user!} idle={userIdleActivity?.idle!}/>
//         </div>
        
//           <div className='h-screen w-full px-4'>
//             <Modal
//             title='New project'
//             disabled
//             projects={projects}
//             body={<CardWithForm/>}
//             />
//             {children}
//           </div>
//       </div>
//     </div>
//   )
// }


