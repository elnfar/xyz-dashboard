import React, { ReactNode } from 'react'

export default function PageHeader({children}:{
    children:ReactNode
}) {
  return (
    <main className="min-h-screen w-full flex md:items-center justify-center  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">{children}</main>
  )
}
