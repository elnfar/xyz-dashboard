import { CustomKanban } from '@/components/global/dnd';
import { prismaClient as prisma } from '@/lib/prisma'
import { auth } from '@/auth';
import Modal from '@/components/global/modal';
import { IssueDialog } from '../_components/create-issue-dialog';
import { singleProject } from '@/app/_actions/getProjects';
import { getTeamMembers } from '@/app/_actions/getTeamMembers';
import { getIssues } from '@/app/_actions/getIssues';



export default async function page({params}:{
    params: {
        id:string
    }
}) {


    const issues = await getIssues(params); 

    const project = await singleProject(params);
    if(!project) {
      return "No project found"
    }

    const users = await getTeamMembers();


  return (
    <div className=''>
        {/* <ProjectNavbar issues={issues} projectId={projects.id}/> */}
          <Modal
          title='Add issue'
          disabled
          projects={project}
          body={<IssueDialog projectId={project.id} users={users || []}/>}
          />
        <CustomKanban issues={issues} projectId={params.id} users={users} projects={project}/>
    </div>
  )
}
