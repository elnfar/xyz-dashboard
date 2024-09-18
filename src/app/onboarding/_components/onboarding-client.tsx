'use client';

import { updateWorkplaceSlug } from '@/app/_actions/updateWorkplaceSlug';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';


import React, { useState } from 'react';

enum Steps {
  TENANT_NAME = 'TENANT_NAME',
  TEAM_MEMBER_AMOUNT = 'TEAM_MEMBER_AMOUNT'
}

export default function OnboardingClient() {
  const [steps, setSteps] = useState(Steps.TENANT_NAME);
  const [tenantName, setTenantName] = useState('');
  const [size, setSize] = useState('0');

  async function onNext(event: React.FormEvent) {
    event.preventDefault(); 

    if (steps === Steps.TENANT_NAME) {
      setSteps(Steps.TEAM_MEMBER_AMOUNT);
    } else if (steps === Steps.TEAM_MEMBER_AMOUNT) {
      const formData = new FormData();
      formData.append('workplace', tenantName);
      formData.append('size',size);
      try { 
        await updateWorkplaceSlug(formData);

      } catch (error) {
        console.error('Failed to update workplace slug:', error);
      }
    }

  }


  
  const tenantNameBody = (
    <div>
      <Input
        placeholder='Tenant name'
        name='workplace'
        id='workplace'
        onChange={(e) => setTenantName(e.target.value)}
        value={tenantName}
        className='min-w-[400px]'
        required
      />
    </div>
  );

  const tenantTeamAmount = (
    <div>
      <Input
        placeholder='Your team amount'
        type='number'
        name='size'
        id='size'
        onChange={(e) => setSize(e.target.value)}
        className='min-w-[400px]'
        required
      />
    </div>
  );

  return (
    <div className='flex items-center justify-center h-screen w-full'>
      
      <form onSubmit={onNext} className='flex flex-col gap-2  items-start min-w-40 max-w-[500px]'>
        <h1 className='font-extrabold text-2xl'>Welcome to Siizz, please fill in the inputs to set up your workspace.</h1>
        <div>{steps === Steps.TENANT_NAME ? tenantNameBody : tenantTeamAmount}</div>
        <Button type='submit' variant="secondary" className='dark:bg-white'>Next</Button>
      </form>
    </div>
  );
}
