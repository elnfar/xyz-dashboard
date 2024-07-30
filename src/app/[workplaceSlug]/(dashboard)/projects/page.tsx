
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
      <ProjectNavbar/>
      <div className='py-10 grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {projects.map((project) => <ProjectSingle key={project.id} project={project}/>)}
      </div>
    </div>
  )
}



function ProjectNavbar() {
  return (
    <nav className='py-4 w-full'>
      <div className=''>
        <ButtonClient title='create'/>
      </div>
    </nav>
  )
}