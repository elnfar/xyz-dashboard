import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UseSidebarToggleStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useSidebarToggle = create(
  persist<UseSidebarToggleStore>(
    (set) => ({
      isOpen: true,
      setIsOpen: (open: boolean) => {
        set({ isOpen: open });
      }
    }),
    {
      name: 'sidebarOpen',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
