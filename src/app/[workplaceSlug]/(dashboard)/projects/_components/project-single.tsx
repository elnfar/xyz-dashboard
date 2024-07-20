import { Project, Tenant } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function ProjectSingle({project}:{
    project:Project & {
      tenant:Tenant
    }
}) {
  return (
    <Link href={`/${project.tenant.name}/projects/${project.id}`} className='w-[300px] h-[150px] bg-[rgb(25,25,25)] p-5 text-white block'>
        <div >
        {project.name}
        </div>

        <div>
            {project.industry}
        </div>
    </Link>
  )
}
