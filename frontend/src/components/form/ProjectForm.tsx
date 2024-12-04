"use client"
import Input from "@/components/UI/Input";
import FileInput from "@/components/UI/FileInput";
import {useState} from "react";
import {Project} from "@/interfaces/Project"
import Textarea from "@/components/UI/Textarea";
import LinkInput from "@/components/UI/LinkInput";


function ProjectForm() {
    const [project, setProject] = useState<Project>({title: null, images: null, content: null, links: null})

    return (
        <div className={`nightMode bg-foreground border border-gray rounded-md p-4 flex  w-full`}>
            < FileInput/>
            <div className=' ml-2 space-y-2 w-full'>
                <Input type="text" placeholder="titre du projet"
                       onChange={value => setProject({...project, title: value})} name="title"/>
                <Textarea placeholder="Description du projet" name="content"
                       onChange={value => setProject({...project, content: value})}/>
                <LinkInput placeholder="liens vers le projet" name="link" onChange={value => setProject({...project, content: value})} />
            </div>

        </div>
    );
}

export default ProjectForm;