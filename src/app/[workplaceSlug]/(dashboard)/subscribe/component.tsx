'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import axios from 'axios';
import React, { useState } from 'react'



export default function Component() {

  
    const [email, setEmail] = useState('')



    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setEmail(e.target.value);
  }

    console.log(email);
    

    function onSubmit(e:any) {
        e.preventDefault();

        axios({
          method: 'post',
          url: '/api/subscribe',
          data:{
            email:email
          }
        })


      
        console.log('scuccess', email);

    }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-x-4">
    <Input
      type="email"
      placeholder="hi@manuarora.in"
      name='email'
      id='email'
      onChange={handleChange}
      value={email}
      className="rounded-xl border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-800 placeholder:text-neutral-700 text-white py-6 "
    />
    <Button type='submit' variant="default" className="bg-white py-6 rounded-xl cursor-pointer relative z-10 hover:bg-neutral-500">Subscribe</Button>
    </form>
  )
}
