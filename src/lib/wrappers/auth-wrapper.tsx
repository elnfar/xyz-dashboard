'use client';

import { ReactNode, useEffect, useState } from 'react'
import { Tenant, User } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';

type NewUser = {
    tenant: Tenant
} & User | null

export default function AuthenticationWrapper({ children }: {
    children: ReactNode,
}) {

    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);



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
