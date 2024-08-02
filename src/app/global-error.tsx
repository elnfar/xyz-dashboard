'use client'

import Image from "next/image"
import Link from "next/link"


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex justify-center items-center flex-col min-h-screen">
        <Image alt="Error image" src='/error.svg' width={150} height={150}/>

          <h1 className="text-4xl font-semibold">Something went wrong!</h1>
          <div><button onClick={() => reset()} className="text-blue-500">Try again</button> or go back to home page <Link className="text-blue-500" href='/'>Home</Link> </div>
      </body>
    </html>
  )
}