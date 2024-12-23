"use client";

import {Button, Input, Textarea} from "@nextui-org/react";
import FileInput from "@/components/UI/FileInput";
import {useMultiStep} from "@/utils/store";

export interface StepTwoData {
    competences: Array<{
        nom: string;
        description: string;
        medias: string[];
    }>;
}


function SecondStepForm() {
    const {multiStep, setMultiStep} = useMultiStep();

    const handleCompetenceChange = (index: number, field: string, value: any) => {
        const newCompetences = [...multiStep.step2.competences];
        if (field === "medias") {
            newCompetences[index] = {
                ...newCompetences[index],
                medias: value.map((file: File) => URL.createObjectURL(file)),
            };
        } else {
            newCompetences[index] = {
                ...newCompetences[index],
                [field]: value,
            };
        }
        const newStep2 = {...multiStep.step2, competences: newCompetences};
        setMultiStep({...multiStep, step2: newStep2});

    };

    const addCompetence = () => {
        const newCompetences = [
            ...multiStep.step2.competences,
            {nom: "", description: "", medias: []},
        ];
        const newStep2 = {...multiStep.step2, competences: newCompetences};
        setMultiStep({...multiStep, step2: newStep2});
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Compétences</h3>
            {multiStep.step2.competences.map((comp, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                    <Input
                        label="Nom de la compétence"
                        value={comp.nom}
                        onChange={(e) =>
                            handleCompetenceChange(index, "nom", e.target.value)
                        }
                    />
                    <Textarea
                        label="Description"
                        value={comp.description}
                        onChange={(e) =>
                            handleCompetenceChange(index, "description", e.target.value)
                        }
                    />
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Images de la compétence
                        </label>
                        <FileInput
                            onChange={(files) =>
                                handleCompetenceChange(index, "medias", files)
                            }
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
    );
}

export default SecondStepForm;

