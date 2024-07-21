
import { getProjects } from '@/app/_actions/getProjects';
import ProjectSingle from './_components/project-single'
import ButtonClient from '@/components/global/ButtonClient'
import AuthenticationWrapper from '@/lib/wrappers/auth-wrapper';


export const revalidate = 3600


export default async function page() {


  const projects = await getProjects();

  if(projects.length === 0) return (
    <div className='px-8 py-12 space-y-4'> 
      <p className=' text-white text-2xl'>No project found</p>
      <ButtonClient title='create'/>
     </div>
  )

  


  return (
    <div>
      <div className='py-10'>
      <ButtonClient title='create'/>
        {projects.map((project) => <ProjectSingle key={project.id} project={project}/>)}
      </div>
    </div>
  )
}
