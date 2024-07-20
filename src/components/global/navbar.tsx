import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function Navbar() {
  
  return (
    <nav className='fixed z-50 text-white w-full p-5'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-x-12'>
           <h1 className='text-2xl font-bold underline'>Aiiz</h1>
        </div>  

        <div>
          <Button asChild variant="outline" className='rounded-full'>
            <Link href="/dashboard">Get started</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
