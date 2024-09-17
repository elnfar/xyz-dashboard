"use client"

import { cn } from "@/lib/utils";
import { useStore } from "zustand";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/global/menu"; 
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Idle, User } from "@prisma/client";
import { UserProfile } from "./Avatar";
import { ThemeToggle } from "./theme-toggle";


type IdleType = {
  idle:Idle
}

export function Sidebar({user,workplaceSlug}:{
  user:User,
  workplaceSlug:string
}) {

  const sidebar = useStore(useSidebarToggle, (state) => state);  
  if(!sidebar) return null;

  return (
    <aside

      className={cn(
        "fixed top-0 left-0 z-[9999999] bg-[rgb(23,23,23)] h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <div 
          onMouseEnter={() => sidebar.setIsOpen(true)}
          onMouseLeave={() => sidebar.setIsOpen(false)}
          className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
            <div className="flex items-center justify-between w-full">
              <div className={` ${sidebar.isOpen}`}><UserProfile userSrc={user.image || ''}/></div>
              <div className={` ${sidebar.isOpen ? 'block text-white text-md font-bold border-2 rounded-lg py-1 px-4' : 'hidden'}`}>{workplaceSlug}</div>
            </div>
        </Button>
        <Menu workplaceSlug={workplaceSlug} isOpen={sidebar?.isOpen} user={user}/>
        
      </div>
    </aside>
  );
}