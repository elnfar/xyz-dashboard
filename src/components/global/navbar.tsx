'use client'

import { User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const links = [
  {
    title:'Home',
    href:"/dashboard"
  },
  {
    title:'Projects',
    href:"/projects"
  },
  {
    title:'Team',
    href:"/team"
  },
  
]

export default function Navbar({workspaceSlug}:{
  workspaceSlug:string
}) {

  const path = usePathname();
  
  
  return (
    <header>
      <div className="flex items-center justify-between px-4 border-b-2">

        <div className="flex items-center space-x-12">
          <h1 className="text-4xl font-extrabold">Siizz</h1>

          <ul className="flex items-center gap-4 text-sm font-semibold">
              {links.map((item) => (
                <li className="py-5" key={item.href}><Link href={`/${workspaceSlug}/${item.href}`}>{item.title}</Link></li>
              ))}
          </ul>
          </div>

          <div>
            <User/>
          </div>
      </div>


    </header>
  )
}
