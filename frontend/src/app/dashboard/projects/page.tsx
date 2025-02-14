import ProjectForm    from "@/components/form/ProjectForm";
import DashboardTitle from "@/components/DashboardTitle";
import Projects       from "@/components/UI/Projects";

export default function ProjectsPage() {
  return (
    <>
      <DashboardTitle title="Vos projets " />
      <div className="flex gap-4 flex-wrap">
        <ProjectForm />
        <Projects />
      </div>
    </>
  );
}
