import { getUserSession } from "@/lib/auth";
import { permanentRedirect, redirect } from "next/navigation";

export const revalidate = 3600;


export default async function page() {

  // const sessionUser = await getUserSession();

  // if(sessionUser?.isOnboarded === false) {
  //   redirect(`/onboarding`)
  // } 


  return <div>Page</div>
}
