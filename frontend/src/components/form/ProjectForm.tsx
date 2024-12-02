"use client"
import {Input} from "@nextui-org/input";
import FileInput from "@/components/UI/FileInput";

function ProjectForm() {
    return (
        <div className={`bg-foreground border border-gray rounded-md p-4 flex`}>
            < FileInput />

        </div>
    );
}

export default ProjectForm;