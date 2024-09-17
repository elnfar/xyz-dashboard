import { Sidebar } from "@/components/global/sidebar";
import { ReactNode } from "react";
import { getSessionUser } from "@/app/_actions/user";
import Providers from "@/components/providers/progress-provider";
import { checkIsAuthenticated } from "@/lib/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { checkIsOnboarded } from "@/lib/isOnboarded";



export async function generateMetadata({ params }: { params: string }) {
  const user = await getSessionUser();

  return {
    title: `${user?.tenant.name} - Home`,
  };
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { workplaceSlug: string };
}) {
  const user = await getSessionUser();
  const { workplaceSlug } = params;

  const isAuthenticated = await checkIsAuthenticated();
  const isOnboarded = await checkIsOnboarded();

  if (!isAuthenticated) {
    redirect("/");
  }

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  

  // if (user?.tenant.name !== workplaceSlug) {
  //   throw new Error("No such a workplace found!");
  // }

  return (
    <Providers>
      <div className="">
        <div className="flex justify-between">
          <div className="overflow-y-scroll h-screen w-24">
            <Sidebar user={user!} workplaceSlug={workplaceSlug} />
          </div>
          <div className="h-screen w-full px-4">
            {children}
          </div>
        </div>
      </div>
    </Providers>
  );
}
