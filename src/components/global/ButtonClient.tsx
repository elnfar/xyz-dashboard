'use client';

import useProjectModal from '@/hooks/useProjectModal';
import React from 'react'
import { Button } from '../ui/button';

export default function ButtonClient({title}:{
    title:string,
}) {

 const {onOpen } = useProjectModal()
  return (
   <Button onClick={onOpen} variant="secondary" className='bg-white text-black'>{title}</Button>
  )
}
