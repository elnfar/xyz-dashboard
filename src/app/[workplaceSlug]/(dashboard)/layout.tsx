import { Sidebar } from "@/components/global/sidebar";
import { ReactNode } from "react";
import { getSessionUser } from "@/app/_actions/user";
import Providers from "@/components/providers/progress-provider";
import { checkIsAuthenticated } from "@/lib/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { checkIsOnboarded } from "@/lib/isOnboarded";
import ProjectModal from "./projects/_components/project-modal";
import { CardWithForm } from "@/components/global/CardWithForm";
import { getProjects } from "@/app/_actions/getProjects";
import IssueModal from "./projects/_components/issue-modal";



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
  const projects = await getProjects();
  const isAuthenticated = await checkIsAuthenticated();
  const isOnboarded = await checkIsOnboarded();

  console.log(isOnboarded);
  

  if (!isAuthenticated) {
    redirect("/");
  }

  if (!user?.isOnboarded) {
    redirect("/onboarding");
  }
  
  if (user?.tenant.name !== workplaceSlug) {
    throw new Error("No such a workplace found!");
  }

  return (
    <Providers>
      <div className="">
        <div className="flex justify-between">
          <div className="overflow-y-scroll h-screen w-24">
            <Sidebar user={user!} workplaceSlug={workplaceSlug} />
          </div>
          <div className="h-screen w-full px-4">
            <ProjectModal
              projects={projects}
            />
            {children}
          </div>
        </div>
      </div>
    </Providers>
  );
}
