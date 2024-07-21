import GoogleSignInButton from "@/components/sign-in";
import { getUser } from "@/lib/user";
import { EPageTypes } from "@/lib/utils";
import AuthenticationWrapper from "@/lib/wrappers/auth-wrapper";


export default async function page() {

  const user = await getUser();

  return (
    <AuthenticationWrapper user={user} prop={{pageType:EPageTypes.NON_AUTHENTICATED}}>
    <div className="flex items-center justify-center h-screen">
      <div className="">
          <GoogleSignInButton/>
      </div>
    </div>
    </AuthenticationWrapper>
  )
}


