'use client';

import { CardWithForm } from '@/components/global/CardWithForm';
import Modal from '@/components/global/modal';
import useProjectModal from '@/hooks/useProjectModal';
import { Project, User } from '@prisma/client';
import { IssueDialog } from './create-issue-dialog';
import useIssuesModal from '@/hooks/useIssuesModal';

interface ProjectModalInterface {
  projectId:string,
  users: User[]
}

export default function IssueModal({projectId, users}:ProjectModalInterface) {
  
  const {isOpen,onClose} = useIssuesModal();  

  if(!isOpen) return null;


  return (
    <div className={`${isOpen ? 'fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm' : 'hidden'}`}>
      <Modal
        isOpen={isOpen}
        title="Create an issue"
        body={
        <IssueDialog
        projectId={projectId}
        users={users}
        />
    }
        onClose={onClose}
      />
    </div>
  );
}
