import { SignInPage } from "@/components/sign-in";
import { checkIsAuthenticated } from "@/lib/checkIsAuthenticated";
import { EPageTypes } from "@/lib/utils";
import AuthenticationWrapper from "@/lib/wrappers/auth-wrapper";
import { redirect } from "next/navigation";

export default async function page() {

  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/zzz");
  } else {
    return <LoginPage/>;
  }
}


function LoginPage() {
  return (

          <div className="flex items-center justify-center h-screen">
              <SignInPage/>
          </div>
  )
}

