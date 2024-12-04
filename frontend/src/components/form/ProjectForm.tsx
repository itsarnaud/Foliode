"use client"
import {Input, Textarea} from "@nextui-org/input";
import FileInput from "@/components/UI/FileInput";



function ProjectForm() {

    return (
        <div className={`nightMode bg-foreground border border-gray rounded-md p-4 flex  w-full`}>
            < FileInput/>
            <div className='space-y-2 w-full'>
                <Input isRequired isClearable name="text" type="text"
                       variant="bordered" placeholder="Titre du projet" className="rounded-lg border border-gray-700 bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" />
                <Textarea placeholder="Description du projet" variant="bordered" className="rounded-lg border border-gray-700 bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" />
            </div>




        </div>
    );
}

export default ProjectForm;