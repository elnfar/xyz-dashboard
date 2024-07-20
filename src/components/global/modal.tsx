'use client';

import useProjectModal from '@/hooks/useProjectModal';
import { Project } from '@prisma/client';

interface ProjectModalInterface {

  title: string;
  body: React.ReactElement;
  disabled?: boolean;
  projects: Project | Project[];
}

export default function Modal({
  body,
}: ProjectModalInterface) {
  
  const {isOpen} = useProjectModal();  


  return (
    <div className={`${isOpen ? 'fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm' : 'hidden'}`}>
      {isOpen && (
       body
      )}
    </div>
  );
}
