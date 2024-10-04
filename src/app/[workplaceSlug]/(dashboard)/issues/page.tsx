import { getTeamMembers } from "@/app/_actions/getTeamMembers"


export default async function page() {

 const team = await getTeamMembers();


 const issues = team?.issues;

  return (
    <div className="py-4">
        <h1 className="text-2xl font-bold py-4">Team of {team?.name} - issues</h1>


        <div className="flex flex-col gap-2">
        {issues?.map((item) => (
            <div className="p-4 border-2" key={item.id}>
                <h1>title: {item.title}</h1>
                <p>description: {item.description}</p>
            </div>
        ))}
        </div>
    </div>
  )
}
