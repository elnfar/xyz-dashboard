"use client"

import Link from "next/link";
import { PanelsTopLeft, SidebarClose } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "zustand";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/global/menu"; 
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import Image from "next/image";
import { SidebarToggle } from "./sidebar-toggle";
import { Session, User } from "next-auth";
import { SignOut } from "../sign-out";
import { SignIn } from "../sign-in";
import { Activity, Idle } from "@prisma/client";


type IdleType = {
  idle:Idle
}

export function Sidebar({session, idle,workplaceSlug}:{
  session:Session,
  idle: Idle,
  workplaceSlug:string
}) {



  // {/* 
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if(workplaceSlug) {
    
  }
  
  if(!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-[9999999] bg-[rgb(23,23,23)] h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className={`w-6 h-6 mr-1 ${sidebar.isOpen ? 'hidden' :'block'}`}>S</div>
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              <Image width={200} height={200} src="/signdia.svg" alt=""/>
            </h1>
          </Link>
        </Button>
        {/* <div className="w-24 h-24 bg-slate-300 p-4 rounded-full">
        </div>  */}
        {/* {!session ? <SignIn/> : <SignOut/>}  */}
        <Menu workplaceSlug={workplaceSlug} isOpen={sidebar?.isOpen} idle={idle} session={session}/>
      </div>
    </aside>
  );
}