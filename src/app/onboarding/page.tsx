import AuthenticationWrapper from "@/lib/wrappers/auth-wrapper";
import OnboardingClient from "./_components/onboarding-client";
import { EPageTypes } from "@/lib/utils";


export default async function page() {


  
  return (
    <AuthenticationWrapper prop={{pageType: EPageTypes.AUTHENTICATED}}>
        <OnboardingClient/>
    </AuthenticationWrapper>
  )
}
