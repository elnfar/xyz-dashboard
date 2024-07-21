import GoogleSignInButton from "@/components/sign-in";
import { getUser } from "@/lib/user";

export default async function page() {

  const user = await getUser();

  if(user) return

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="">
          <GoogleSignInButton/>
      </div>
    </div>
  )
}


