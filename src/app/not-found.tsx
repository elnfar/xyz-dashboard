import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full items-center flex h-screen justify-center flex-col bg-black text-white'>
      <h1 className=' font-bold text-3xl'>Oops, it looks like this page doesn't exist, please go back.</h1>
      <Link className='text-blue-400' href='/'>Home page</Link>
    </div>
  )
}