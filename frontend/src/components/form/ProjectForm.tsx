"use client"

import { useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import FileInput from "@/components/UI/FileInput";
import LinkInput from "@/components/UI/LinkInput";
import Buttons from "@/components/UI/button";
import { Project } from "@/interfaces/Project";
import { apiPost } from "@/utils/apiRequester";

function ProjectForm() {
    const [project, setProject] = useState<Project>({
        title: '',
        description: '',
        links: [],
        images: []
    })


    const createProject = async () => {
        const data = new FormData();
        data.append("json", JSON.stringify({title: project.title, description: project.description, links: project.links}));

        project.images.forEach((image, index) => {
            data.append(`images[${index}]`, image);
        });

        try {
            await apiPost('project', data, 'multipart/form-data');
        } catch (error) {
            console.log("Erreur lors de la création du projet :", error);
        }
    }

    const inputStyles = {
        input: "px-2 py-1 text-gray-400 bg-foreground",
        inputWrapper: "bg-transparent border-2 border-gray-500 hover:border-gray-300 focus:border-primary rounded-md transition-all duration-300 ease-in-out"
    };

    return (
        <div className="nightMode bg-foreground border border-gray rounded-md p-5 flex flex-col lg:flex-row w-full">
            <FileInput onChange={files => setProject({...project, images: files})}/>
            <div className='ml-2 space-y-2 w-full'>
                <Input
                    type="text"
                    placeholder="titre du projet"
                    onChange={(e) => setProject({...project, title: e.target.value})}
                    name="title"
                    classNames={inputStyles}
                    variant={"bordered"}
                />
                <Textarea
                    placeholder="Description du projet"
                    name="content"
                    onChange={(e) => setProject({...project, description: e.target.value})}
                    classNames={inputStyles}
                    variant={"bordered"}
                />
                <LinkInput
                    placeholder="liens vers le projet"
                    name="link"
                    onChange={value => setProject({...project, links: value})}
                />
                <Buttons
                    text="Crée un projet"
                    style='form'
                    className="bg-primary w-1/3 ml-0 mt-5"
                    onClick={createProject}
                />
            </div>
        </div>
    );
}

export default ProjectForm;

