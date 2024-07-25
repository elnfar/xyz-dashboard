import GoogleSignInButton from "@/components/sign-in";
import { EPageTypes } from "@/lib/utils";
import AuthenticationWrapper from "@/lib/wrappers/auth-wrapper";
import { getSessionUser } from "./_actions/user";


export default async function page() {

  const user = await getSessionUser();

  return (
    <AuthenticationWrapper user={user} prop={{pageType: EPageTypes.NON_AUTHENTICATED}}>
        <div className="flex items-center justify-center h-screen">
          <div className="">
              <GoogleSignInButton/>
          </div>
        </div>
      </AuthenticationWrapper>
  )
}


