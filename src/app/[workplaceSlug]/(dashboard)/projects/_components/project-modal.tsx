'use client';

import { CardWithForm } from '@/components/global/CardWithForm';
import Modal from '@/components/global/modal';
import useProjectModal from '@/hooks/useProjectModal';

export default function ProjectModal() {
  
  const {isOpen,onClose} = useProjectModal();  

  if(!isOpen) return null;


  return (
    <div className={`${isOpen ? 'fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm' : 'hidden'}`}>
      <Modal
        isOpen={isOpen}
        title="Create a project"
        body={<CardWithForm/>}
        onClose={onClose}
      />
    </div>
  );
}
