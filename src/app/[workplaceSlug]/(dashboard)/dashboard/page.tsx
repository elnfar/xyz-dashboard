import { getSessionUser } from "@/app/_actions/user";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

interface UserSession {
  name: string;
  email: string;
  image: string | null;
  id: string;
  tenant: {
    id: string;
  };
}

export default async function page() {
  const user = await getSessionUser();
  const team = await prisma.tenant.findFirst({
    where: {
      id: user?.tenant.id,
    },
    include: {
      users: true,
      issues: true,
      projects: true,
    },
  });

  const DONE = team?.issues.filter((item) => item.category === "DONE").length;
  const stats = [
    { name: "Issues", value: team?.issues.length },
    { name: "Issues Done", value: DONE || 0 },
    { name: "Team size", value: team?.users.length },
    { name: "Success rate", value: "98.5%" },
  ];

  return (
    <main className="">
      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="px-4 py-6 sm:px-6 lg:px-8 bg-zinc-800"
              >
                <p className="text-sm font-medium leading-6 text-gray-400">
                  {stat.name}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-x-4">
            <div className="border-2 w-fit px-4 py-2">
              <p className="sm">
                Invite your team members:{" "}
                {"https://app.siiz.xyz/invite/" + user?.tenant.inviteKey}
              </p>
            </div>
            <Button variant="secondary" className="bg-white text-black">
              Copy
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function greetUser({ name }: { name: any }) {
  const now = new Date();

  const hours = now.getHours();

  if (hours >= 0 && hours < 6) {
    return `Good night ${name}`;
  } else {
    return `Good day ${name}`;
  }
}
