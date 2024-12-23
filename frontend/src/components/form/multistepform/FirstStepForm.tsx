"use client";

import {Input, Textarea} from "@nextui-org/react";
import {useMultiStep} from "@/utils/store";

export interface StepOneData {
    titre: string;
    sousTitre: string;
    presentation: string;
    logo: File | null;
}

function FirstStepForm() {
    const {multiStep, setMultiStep} = useMultiStep()
    const handleChange = (field: keyof StepOneData, value: string) => {
        const updatedStep1 = {...multiStep.step1, [field]: value}
        setMultiStep({...multiStep, step1: updatedStep1})
    }

    return (
        <div className="space-y-4 w-full">
            <Input
                label="Titre du portfolio"
                placeholder="Ex: Lucie Maillet"
                value={multiStep.step1.titre}
                onChange={(e) => handleChange("titre", e.target.value)}
            />

            <Input
                label="Sous-titre"
                placeholder="Ex: Étudiant en BUT Informatique"
                value={multiStep.step1.sousTitre}
                onChange={(e) => handleChange("sousTitre", e.target.value)}
            />

            <Textarea
                label="Présentation"
                placeholder="Présentez-vous en quelques lignes..."
                value={multiStep.step1.presentation}
                onChange={(e) => handleChange("presentation", e.target.value)}
                minRows={3}
            />

            {/* <div>
            <label className="block text-sm font-medium mb-1">Logo ou bannière</label>
            <FileInput 
                onChange={(files) => {
                    if (files.length > 0) {
                        handleChange("logo", files[0]);
                    }
                }}
            />
            <p className="text-sm text-gray-500 mt-1">Format recommandé : PNG ou JPG, max 2MB</p>
        </div> */}
        </div>
    );
}

export default FirstStepForm;