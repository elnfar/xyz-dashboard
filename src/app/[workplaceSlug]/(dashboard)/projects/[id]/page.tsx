import { prismaClient as prisma } from "@/lib/prisma";
import { CustomKanban } from "@/components/global/dnd";
import { getSessionUser } from "@/app/_actions/user";
import IssueModal from "../_components/issue-modal";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const user = await getSessionUser();
  
  const singleProject = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      tenantId: user?.tenant.id,
    },
  });

  const issues = await prisma.issue.findMany({
    where: {
      tenantId: user?.tenant.id,
      projectId: singleProject?.id,
    },
  });

  if (!singleProject) {
    return "No project found";
  }

  return (
    <div className="">

      <IssueModal
            projectId={params.id}
            users={users}
        />

      <CustomKanban
        issues={issues}
        projectId={params.id}
        users={users}
        projects={singleProject}
      />
    </div>
  );
}
