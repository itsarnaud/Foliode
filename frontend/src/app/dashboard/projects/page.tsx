import ProjectForm from "@/components/form/ProjectForm";
import DashboardTitle from "@/components/DashboardTitle";

export default function Projects() {
  return (
    <>
        < DashboardTitle title="Vos projets " />
        <div className='grid-cols-2 gap-2 p-4 block lg:grid'>
            < ProjectForm />
        </div>

    </>
  )
}