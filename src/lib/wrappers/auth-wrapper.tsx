// 'use client';
// import { ReactNode, useEffect} from 'react'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// import useSWR from 'swr';
// import { fetcher } from './fetcher';


// const AuthenticationWrappe = ({ children,pageType }:{
//     children: ReactNode,
//     pageType?:string
// }) => {





    
//     const router = useRouter()
//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//     const nextPath = searchParams.get("next_path");

//     let {data,isLoading,error} = useSWR(`/api/user`,fetcher);
//     console.log(data);
    



//       if(pageType === EPageTypes.NON_AUTHENTICATED) {
//         if(!data.user.id) return <>{children}</>
//         if(data.user.id && data.user.isOnboarded) {
//             router.push(`/${data.user.tenant.name}`)
//             return <></>;
//         }else {
//             router.push("/onboarding");
//             return <></>;
//         }
//       }

    

//       return <>{children}</>
    
      
      

// // const isValidURL = (url: string): boolean => {
// //     const disallowedSchemes = /^(https?|ftp):\/\//i;
// //     return !disallowedSchemes.test(url);
// //   };

// //     const getWorkspaceRedirectionUrl = (): string => {
// //         let redirectionRoute = "/dashboard";
    
// //         // validating the nextPath from the router query
// //         if (nextPath && isValidURL(nextPath.toString())) {
// //           redirectionRoute = nextPath.toString();
// //           return redirectionRoute;
// //         }
    
// //         // validate the last and fallback workspace_slug
// //         const currentWorkspaceSlug = currentUser?.tenant.name 
    
// //         // validate the current workspace_slug is available in the user's workspace list
// //         const isCurrentWorkspaceValid = currentUser?.tenant.name;
    
// //         if (isCurrentWorkspaceValid) redirectionRoute = `/${currentWorkspaceSlug}`;
    
// //         return redirectionRoute;
// //       };

// //       console.log(currentUser);
      


// //         if (pageType === EPageTypes.NON_AUTHENTICATED) {
// //             if(currentUser) {
// //                 if(currentUser.isOnboarded === false) {
// //                     router.push("/onboarding");
// //                     return <>{children}</>
// //                 }
// //                 if (currentUser.isOnboarded) {
// //                     const currentRedirectRoute = getWorkspaceRedirectionUrl();
// //                     router.push(currentRedirectRoute);
// //                     return <>{children}</>
// //                 } 
// //             }
// //         } else if (pageType === EPageTypes.AUTHENTICATED) {
// //             if (currentUser.id) {
// //                 if (currentUser.isOnboarded) return;
// //                 router.push(`/onboarding`);
// //             } else {
// //                 router.push(`/${pathname ? `?next_path=${pathname}` : ``}`);
// //             }
// //         }


//     //   useEffect(() => {

//     //     if (pageType === EPageTypes.NON_AUTHENTICATED) {
//     //         if (!currentUser?.id) return;
//     //         if (currentUser?.id && currentUser.isOnboarded) {
//     //             const currentRedirectRoute = getWorkspaceRedirectionUrl();
//     //             router.push(currentRedirectRoute);
//     //         } else if (currentUser?.id && !currentUser.isOnboarded) {
//     //             router.push("/onboarding");
//     //         }
//     //     } else if (pageType === EPageTypes.AUTHENTICATED) {
//     //         if (currentUser.id) {
//     //             if (currentUser.isOnboarded) {
//     //                 router.push(`/onboarding`);
//     //             }
//     //         } else {
//     //             router.push(`/${pathname ? `?next_path=${pathname}` : ``}`);
//     //         }
//     //     }
//     //   },[])
      
      

//     // Conditional rendering to avoid navigating while rendering

// }


// export default AuthenticationWrappe;