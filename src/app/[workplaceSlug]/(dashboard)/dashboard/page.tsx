import { getTeamMembers } from "@/app/_actions/getTeamMembers";
import { Button } from "@/components/ui/button";
import { Tooltip } from "./_components/tooltip";

export default async function page() {


  const team = await getTeamMembers();

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
                {"https://app.siiz.xyz/invite/" + team?.inviteKey}
              </p>
            </div>
            <Button variant="secondary" className="bg-white text-black">
              Copy
            </Button>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-3xl py-4">Recently joined members</h2>
                <div className=" flex items-center">
                {team?.users.map((item) => (
                  <Tooltip people={item} key={item.id}/>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
