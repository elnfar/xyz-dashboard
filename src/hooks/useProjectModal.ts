import { create } from 'zustand'


interface ProjectModal {
    isOpen:boolean;
    onOpen:() => void;
    onClose:() => void;
}

const useProjectModal = create<ProjectModal>((set) => ({
  isOpen:false,
  onOpen:() => set({isOpen:true}),
  onClose:() => set({isOpen:false})
}))

export default useProjectModal