import { Project, Tenant, User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function ProjectSingle({project}:{
    project:Project & {
      tenant:Tenant,
    }
}) {
  return (
    <Link href={`/${project.tenant.name}/projects/${project.id}`} className='w-full h-[150px] bg-[rgb(95,95,95)]/50 p-5 text-white block'>
        <div className='space-y-4'>

          <div className='text-sm border-b border-slate-500 py-2'>
              <p className='text-xl'>{project.name}</p>
              <p className='text-gray-300'>{project.industry}</p>
           </div>

            <div>{project.createdAt.toISOString().split('T')[0]}</div>
        </div>
        
    </Link>
  )
}
