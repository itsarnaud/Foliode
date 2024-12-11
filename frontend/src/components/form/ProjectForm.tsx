"use client"
import Input from "@/components/UI/Input";
import FileInput from "@/components/UI/FileInput";
import {useState} from "react";
import {Project} from "@/interfaces/Project"
import Textarea from "@/components/UI/Textarea";
import LinkInput from "@/components/UI/LinkInput";
import Buttons from "@/components/UI/button";
import {apiPost} from "@/utils/apiRequester";


function ProjectForm() {
    const [project, setProject] = useState<Project>({title: null, images: [], description: null, links: null, category: 'default', status: 'finish'})

    const creatProject = async () => {
        const formData = new FormData();


        formData.append("title", project.title || "");
        formData.append("description", project.description || "");
        formData.append("category", project.category || "");
        formData.append("status", project.status || "");

        console.log(formData)


        if (project.images && project.images.length > 0) {
            project.images.forEach((image, index) => {
                formData.append("images[]", image);
            });
        }

        try {
            const response = await apiPost('project', formData);
            console.log(response);
        } catch (error) {
            console.log("Erreur lors de la création du projet :", error);
        }
    }

    return (
        <div className={`nightMode bg-foreground border border-gray rounded-md p-5  flex flex-col lg:flex-row w-full`}>
            < FileInput onChange={file => setProject({...project, images: file})}/>
            <div className=' ml-2 space-y-2 w-full'>
                <Input type="text" placeholder="titre du projet"
                       onChange={value => setProject({...project, title: value})} name="title"/>
                <Textarea placeholder="Description du projet" name="content"
                          onChange={value => setProject({...project, description: value})}/>
                <LinkInput placeholder="liens vers le projet" name="link"
                           onChange={value => setProject({...project, links: value})}/>
                < Buttons text="Crée un projet" style='form' className="bg-primary w-1/3 mt-5"
                          onClick={creatProject}/>
            </div>
        </div>
    );
}

export default ProjectForm;