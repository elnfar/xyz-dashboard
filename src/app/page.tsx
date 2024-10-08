import { SignInPage } from "@/components/sign-in";
import { checkIsAuthenticated } from "@/lib/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { getSessionUser } from "./_actions/user";

export default async function page() {

  const [isAuthenticated, user] = await Promise.all([
    checkIsAuthenticated(),
    getSessionUser()
  ])

  console.log(user?.isOnboarded, "OBD");
  

  if(isAuthenticated && !user?.isOnboarded) {
    redirect(`/onboarding`);
  }

  if (isAuthenticated && user?.isOnboarded) {
    redirect(`/${user?.tenant.name}/dashboard`);
  }else {
    return <LoginPage />;
  }
}

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignInPage />
    </div>
  );
}
