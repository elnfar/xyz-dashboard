import { getUserSession } from '@/lib/auth'
import OnboardingClient from './_components/onboarding-client'

export default async function page() {

  const user = await getUserSession();

  if(user?.isOnboarded) return null;
  
  return (
    <div>
       <OnboardingClient />
    </div>
  )
}
