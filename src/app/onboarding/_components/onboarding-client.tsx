// 'use client';

// import { updateWorkplaceSlug } from '@/app/_actions/updateWorkplaceSlug';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useRouter } from 'next/router';



// import React, { useState } from 'react';

// enum Steps {
//   TENANT_NAME = 'TENANT_NAME',
//   TEAM_MEMBER_AMOUNT = 'TEAM_MEMBER_AMOUNT'
// }

// export default function OnboardingClient() {
//   const [steps, setSteps] = useState(Steps.TENANT_NAME);
//   const [tenantName, setTenantName] = useState('');
//   const [size, setSize] = useState('0');
//   // const router = useRouter()



//   async function onNext(event: React.FormEvent) {
//     event.preventDefault(); 

//     if (steps === Steps.TENANT_NAME) {
//       setSteps(Steps.TEAM_MEMBER_AMOUNT);
//     } else if (steps === Steps.TEAM_MEMBER_AMOUNT) {
//       const formData = new FormData();
//       formData.append('workplace', tenantName);
//       formData.append('size',size);

//       try {
//         await updateWorkplaceSlug(formData);

//         // router.push(`/${tenantName}/dashboard`);


//       } catch (error) {
//         console.error('Failed to update workplace slug:', error);
//       }
//     }
//   }




  
//   const tenantNameBody = (
//     <div>
//       <Input
//         placeholder='Tenant name'
//         name='workplace'
//         id='workplace'
//         onChange={(e) => setTenantName(e.target.value)}
//         value={tenantName}
//       />
//     </div>
//   );

//   const tenantTeamAmount = (
//     <div>
//       <Input
//         placeholder='Your team amount'
//         type='number'
//         name='size'
//         id='size'
//         onChange={(e) => setSize(e.target.value)}
//       />
//     </div>
//   );

//   return (
//     <div>
//       <form onSubmit={onNext}>
//         {steps === Steps.TENANT_NAME ? tenantNameBody : tenantTeamAmount}
//         <Button type='submit' variant="secondary" className='bg-white'>Next</Button>
//       </form>
//     </div>
//   );
// }
