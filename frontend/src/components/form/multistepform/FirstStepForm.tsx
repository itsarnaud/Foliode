"use client";

import { useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";

export interface StepOneData {
    formation: string | null;
    etablissement: string | null;
    annee: string | null;
    competences: string[];
}

interface FirstStepFormProps {
    onDataChange: (data: StepOneData) => void;
}

function FirstStepForm({ onDataChange }: FirstStepFormProps) {
    const [formData, setFormData] = useState<StepOneData>({
        formation: null,
        etablissement: null,
        annee: null,
        competences: []
    });

    // Styles séparés pour Input et Select
    const inputStyles = {
        // input: "px-2 py-1 text-gray-400 bg-foreground",
        // inputWrapper: "bg-transparent border-2 border-gray-500 hover:border-gray-300 focus:border-primary rounded-md"
    };

    const selectStyles = {
        // trigger: "bg-transparent border-2 border-gray-500 hover:border-gray-300 focus:border-primary rounded-md",
        // value: "text-gray-400",
        // label: "text-gray-400"
    };

    const handleChange = (field: keyof StepOneData, value: string) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        onDataChange(newData);
    };

    return (
        <div className='space-y-4 w-full'>
            <Select 
                label="Formation"
                placeholder="Sélectionnez votre formation"
                onChange={(e) => handleChange('formation', e.target.value)}
                classNames={selectStyles}
            >
                <SelectItem key="BUT-INFO" value="BUT Informatique">
                    BUT Informatique
                </SelectItem>
                <SelectItem key="BUT-GEII" value="BUT GEII">
                    BUT GEII
                </SelectItem>
            </Select>

            <Input
                type="text"
                label="Établissement"
                placeholder="Nom de l'établissement"
                onChange={(e) => handleChange('etablissement', e.target.value)}
                classNames={inputStyles}
            />

            <Select 
                label="Année d'études"
                placeholder="Sélectionnez votre année"
                onChange={(e) => handleChange('annee', e.target.value)}
                classNames={selectStyles}
            >
                <SelectItem key="1" value="1">1ère année</SelectItem>
                <SelectItem key="2" value="2">2ème année</SelectItem>
                <SelectItem key="3" value="3">3ème année</SelectItem>
            </Select>
        </div>
    );
}

export default FirstStepForm;