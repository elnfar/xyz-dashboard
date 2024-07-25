'use client';

import { ReactNode, useEffect, useState } from 'react'
import { Tenant, User } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { EPageTypes } from '../utils';



type NewUser = {
    tenant: Tenant
} & User | null

export default function AuthenticationWrapper({ children,user,prop }: {
    children: ReactNode,
    prop: { pageType: EPageTypes },
    user?: User & {
        tenant:Tenant
    } | null
}) {

    const { pageType } = prop

    
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const nextPath = searchParams.get("next_path");


const isValidURL = (url: string): boolean => {
    const disallowedSchemes = /^(https?|ftp):\/\//i;
    return !disallowedSchemes.test(url);
  };

    const getWorkspaceRedirectionUrl = (): string => {
        let redirectionRoute = "/dashboard";
    
        // validating the nextPath from the router query
        if (nextPath && isValidURL(nextPath.toString())) {
          redirectionRoute = nextPath.toString();
          return redirectionRoute;
        }
    
        // validate the last and fallback workspace_slug
        const currentWorkspaceSlug = user?.tenant.name 
    
        // validate the current workspace_slug is available in the user's workspace list
        const isCurrentWorkspaceValid = user?.tenant.name;
    
        if (isCurrentWorkspaceValid) redirectionRoute = `/${currentWorkspaceSlug}`;
    
        return redirectionRoute;
      };


      console.log(user);
      

      if (pageType === EPageTypes.NON_AUTHENTICATED) {
        if (!user?.id) return <>{children}</>;
        else {
          if (user?.id && user.isOnboarded) {
            const currentRedirectRoute = getWorkspaceRedirectionUrl();
            router.push(currentRedirectRoute);
            return <></>;
          } else  {
            router.push("/onboarding");
            return <></>;
          }
        }
      }

      if (pageType === EPageTypes.AUTHENTICATED) {
        if (user?.id) {
          if (user && user.isOnboarded) return <>{children}</>;
          if(user.isOnboarded === false) {
            router.push(`/onboarding`);
            return <></>;
          } 

        } else {
          router.push(`/${pathname ? `?next_path=${pathname}` : ``}`);
          return <></>;
        }
      }

    return <>{children}</>
}
