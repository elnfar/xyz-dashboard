import { create } from 'zustand'


interface IssuesModal {
    isOpen:boolean;
    onOpen:() => void;
    onClose:() => void;
}

const useIssuesModal = create<IssuesModal>((set) => ({
  isOpen:false,
  onOpen:() => set({isOpen:true}),
  onClose:() => set({isOpen:false})
}))

export default useIssuesModal;