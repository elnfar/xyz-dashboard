import { checkIsOnboarded } from "@/lib/isOnboarded";
import { getSessionUser } from "../_actions/user";
import OnboardingClient from "./_components/onboarding-client";
import { redirect } from "next/navigation";

export default async function page() {

  const user = await getSessionUser();
  const isOnboarded = await checkIsOnboarded();
  if(isOnboarded) {
    redirect(`/${user?.tenant.name}/dashboard`)
  }
  return <OnboardingClient />;
}
