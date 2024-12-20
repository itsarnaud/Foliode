import ProjectForm from "@/components/form/ProjectForm";
import DashboardTitle from "@/components/DashboardTitle";
import GithubRepots from "@/components/GitHub/GithubRepots";

export default function Projects() {


    return (
        <>
            < DashboardTitle title="Vos projets "/>
            <div className='grid-cols-2 gap-2 p-4 block lg:grid'>
                < ProjectForm/>
            </div>
            <div className='grid grid-cols-1 gap-2 p-4 '>
                < GithubRepots/>
            </div>


        </>
    )
}