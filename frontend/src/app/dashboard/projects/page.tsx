import ProjectForm from "@/components/form/ProjectForm";
import DashboardTitle from "@/components/DashboardTitle";
import Projects from "@/components/UI/Projects";

export default function ProjectsPage() {
  return (
    <>
      <DashboardTitle title="Vos projets " />
      <div className="grid-cols-2 gap-2 p-4 block lg:grid">
        <ProjectForm />

        <Projects />
      </div>
    </>
  );
}
