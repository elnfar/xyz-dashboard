'use client';

import { CardWithForm } from '@/components/global/CardWithForm';
import Modal from '@/components/global/modal';
import useProjectModal from '@/hooks/useProjectModal';
import { Project } from '@prisma/client';

interface ProjectModalInterface {
  projects: Project | Project[];
}

export default function ProjectModal({projects}:ProjectModalInterface) {
  
  const {isOpen,onClose} = useProjectModal();  

  if(!isOpen) return null;


  return (
    <div className={`${isOpen ? 'fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm' : 'hidden'}`}>
      <Modal
        isOpen={isOpen}
        title="Create a project"
        body={<CardWithForm/>}
        projects={projects}
        onClose={onClose}
      />
    </div>
  );
}
