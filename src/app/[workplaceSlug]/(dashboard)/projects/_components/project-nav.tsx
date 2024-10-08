'use client';

import { Button } from '@/components/ui/button';
import useIssuesModal from '@/hooks/useIssuesModal';
import { Issue, Project } from '@prisma/client';
import { User } from 'next-auth';

export default function ProjectNavbar({ issues, projectId, users, projects }: { issues?: Issue[], projectId?: string, users?: User[], projects?: Project | null }) {
  const { onOpen, isOpen } = useIssuesModal();

  return (
    <nav className='py-4 px-4'>
      
      <div className='flex justify-between items-center'>
      
        <div className='flex gap-x-5 text-[rgb(95,95,95)]'>
          <h3 className='lowercase'>{projects?.name}</h3>
          <div className='flex gap-x-2 items-center'>
            <span>Issues {issues?.length}</span>
          </div>
        </div>
        <Button onClick={onOpen}>Add issue</Button>
      </div>
    </nav>
  );
}
