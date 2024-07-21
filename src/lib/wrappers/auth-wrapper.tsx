'use client';

import { ReactNode, useEffect, useState } from 'react'
import { Tenant, User } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { Session } from 'next-auth';

type NewUser = {
    tenant: Tenant
} & User | null

export default function AuthenticationWrapper({ children,user }: {
    children: ReactNode,
    user: User & {
        tenant:Tenant
    }
}) {
    const router = useRouter()
    const pathname = usePathname();


    useEffect(() => {
        if(!user) router.replace('/');

        if(user && pathname === '/') {
            router.replace('/dashboard');
        }

        if(user && user.isOnboarded === true){
            router.replace(`/${user.tenant.name}/dashboard`)
        }
        if(user && user.isOnboarded === false) {
            router.replace(`/onboarding`)
        }
    },[])
    

    // useEffect(() => {
    //     if (user) {
    //         if (user.isOnboarded) {
    //             if (pathname === '/onboarding' || pathname === '/') {
    //                 router.replace(`/${user.tenant.name}/dashboard`);
    //             } else {
    //                 setIsLoading(false); // Allow rendering of children
    //             }
    //         } else {
    //             if (pathname !== '/onboarding') {
    //                 router.replace('/onboarding');
    //             } else {
    //                 setIsLoading(false);
    //             }
    //         }
    //     } else {
    //         setIsLoading(false); 
    //     }
    // }, [user, pathname, router]);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return <>{children}</>
}
