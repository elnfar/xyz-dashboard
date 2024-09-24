import { getProjects } from "@/app/_actions/getProjects";
import ProjectSingle from "./_components/project-single";
import ButtonClient from "@/components/global/ButtonClient";

export default async function page() {
  const projects = await getProjects();

  return (
    <>
      <div>
        <ProjectNavbar />

        <div className="py-10 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectSingle key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}

function ProjectNavbar() {
  return (
    <nav className="py-4 w-full">
      <div className="">
        <ButtonClient title="create" />
      </div>
    </nav>
  );
}
//test2

// test comment