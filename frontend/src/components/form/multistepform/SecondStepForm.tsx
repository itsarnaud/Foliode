"use client";

import {Button, Input} from "@nextui-org/react";
import FileInput from "@/components/UI/FileInput";
import {useMultiStep} from "@/utils/store";

function SecondStepForm() {
    const {multiStep, setMultiStep} = useMultiStep()

    const handleCompetenceChange = (index: number, field: string, value: any) => {
        const newTools = [...multiStep.tools];
        newTools[index] = {
            ...newTools[index],
            [field]: value,
        }
        setMultiStep({ ...multiStep, tools: newTools })
    }

    const addCompetence = () => {
        const newCompetence = { name: "", image: null }
        const updatedTools = [...multiStep.tools, newCompetence]
        setMultiStep({ ...multiStep, tools: updatedTools })
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Compétences</h3>
            {multiStep.tools.map((tool, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                    <Input
                        label="Nom de la compétence"
                        value={tool.name}
                        onChange={(e) =>
                            handleCompetenceChange(index, "name", e.target.value)
                        }
                    />

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Images de la compétence
                        </label>
                        <FileInput
                            onChange={(files) =>
                                handleCompetenceChange(index, "image", files[0])
                            }
                            value={tool.image ? [tool.image] : []}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Format recommandé : PNG ou JPG, max 2MB
                        </p>
                    </div>
                </div>
            ))}
            <Button
                onClick={addCompetence}
                className="dayMode bg-primary text-white"
                variant="flat"
            >
                Ajouter une compétence
            </Button>
        </div>
    )
}

export default SecondStepForm

