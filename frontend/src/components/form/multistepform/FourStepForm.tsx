"use client";
import { useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";

export interface StepOneData {
    formation: string | null;
    etablissement: string | null;
    annee: string | null;
}

interface FirstStepFormProps {
    onDataChange: (data: StepOneData) => void;
}

function FirstStepForm({ onDataChange }: FirstStepFormProps) {
    const [formData, setFormData] = useState<StepOneData>({
        formation: null,
        etablissement: null,
        annee: null
    });

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
            >
                <SelectItem key="BUT-INFO" value="BUT Informatique">BUT Informatique</SelectItem>
                <SelectItem key="BUT-GEII" value="BUT GEII">BUT GEII</SelectItem>
            </Select>

            <Input
                type="text"
                label="Établissement"
                placeholder="Nom de l'établissement"
                onChange={(e) => handleChange('etablissement', e.target.value)}
            />

            <Select 
                label="Année d'études"
                placeholder="Sélectionnez votre année"
                onChange={(e) => handleChange('annee', e.target.value)}
            >
                <SelectItem key="1">1ère année</SelectItem>
                <SelectItem key="2">2ème année</SelectItem>
                <SelectItem key="3">3ème année</SelectItem>
            </Select>
        </div>
    );
}

export default FirstStepForm;