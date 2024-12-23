import React from 'react';
import {Input, Textarea} from "@nextui-org/react";
import FileInput from "@/components/UI/FileInput";
import {useMultiStep} from "@/utils/store";
import LinkInput from "@/components/UI/LinkInput";

function SecondStepProject(index: number) {
    const {multiStep, setMultiStep} = useMultiStep()
    const project = multiStep.step2.projects[index] || { titre: "", description: "", technologies: [], date: "", dateFin: "", medias: [], links: [] };

    const handleProjectChange = (index: number, field: string, value: File[] | string | string[]) => {
        const newProjects = [...multiStep.step2.projects];
        const project = { ...newProjects[index], [field]: value };
        newProjects[index] = project;
        setMultiStep({
            ...multiStep,
            step2: {
                ...multiStep.step2,
                projects: newProjects,
            },
        })
    }

    return (
        <div key={index} className="p-4 border rounded-lg space-y-2">
            <Input
                label="Titre du projet"
                value={project.title}
                onChange={(e) => handleProjectChange(index, "titre", e.target.value)}
            />
            <Textarea
                label="Description"
                value={project.description}
                onChange={(e) =>
                    handleProjectChange(index, "description", e.target.value)
                }
            />
            {  /* <Input
                label="Technologies utilisées (séparées par des virgules)"
                value={project.technologies.join(", ")}
                onChange={(e) =>
                    handleProjectChange(
                        index,
                        "technologies",
                        e.target.value.split(",").map((t) => t.trim())
                    )
                }
            />
            <div className="flex gap-4">
                <Input
                    type="date"
                    label="Date de début"
                    value={project.date}
                    onChange={(e) =>
                        handleProjectChange(index, "date", e.target.value)
                    }
                />
                <Input
                    type="date"
                    label="Date de fin"
                    value={project.dateFin}
                    onChange={(e) =>
                        handleProjectChange(index, "dateFin", e.target.value)
                    }
                /> */ }

            <LinkInput
                placeholder="Liens vers le projet"
                name="links"
                onChange={(value) => handleProjectChange(index, "links", value)}
            />
            <div>
                <label className="block text-sm font-medium mb-1">
                    Images du projet
                </label>
                <FileInput
                    onChange={(files) => handleProjectChange(index, "medias", files)}
                />
                <p className="text-sm text-gray-500 mt-1">
                    Format recommandé : PNG ou JPG, max 2MB
                </p>
            </div>
        </div>
    )

}


export default SecondStepProject;