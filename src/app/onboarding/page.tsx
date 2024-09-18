import { redirect } from "next/navigation";
import { getSessionUser } from "../_actions/user";
import OnboardingClient from "./_components/onboarding-client";

export default async function page() {



  return <OnboardingClient />;
}
